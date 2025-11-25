import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from '@nestjs/common'
import { Response } from 'express'
import { QueryFailedError } from 'typeorm'

interface ErrorDetail {
  field?: string
  message: string
  constraint?: string
  value?: string | number
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest()
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'
    let errors: ErrorDetail[] = []
    
    // Handle HttpException (includes BadRequestException, NotFoundException, etc.)
    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as {
          message?: string | string[]
          error?: string
          errors?: ErrorDetail[]
        }
        
        // Handle validation errors from class-validator
        if (Array.isArray(responseObj.message)) {
          message = 'Validation failed'
          errors = responseObj.message.map((msg: string) => {
            // Parse validation error messages
            const fieldMatch = msg.match(/^([\w.]+)\s+(.+)$/)
            if (fieldMatch) {
              return {
                field: fieldMatch[1],
                message: fieldMatch[2],
              }
            }
            return { message: msg }
          })
        } else if (responseObj.errors && Array.isArray(responseObj.errors)) {
          // Handle errors array from custom BadRequestException
          message = responseObj.message || 'Validation failed'
          errors = responseObj.errors
        } else {
          message = responseObj.message || exception.message
          if (responseObj.error) {
            errors = [{ message: responseObj.error }]
          }
        }
      }
    }
    // Handle TypeORM database errors
    else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST
      const error = exception as QueryFailedError & {
        code?: string
        detail?: string
      }
      
      // PostgreSQL error codes
      switch (error.code) {
        case '23505': // Unique constraint violation
          message = 'Duplicate entry found'
          const uniqueMatch = error.detail?.match(/Key \(([^)]+)\)=\(([^)]+)\)/)
          if (uniqueMatch) {
            errors = [{
              field: uniqueMatch[1],
              message: `Value '${uniqueMatch[2]}' already exists`,
              constraint: 'unique',
              value: uniqueMatch[2],
            }]
          } else {
            errors = [{ message: error.detail || 'A record with this value already exists' }]
          }
          break
          
        case '23503': // Foreign key constraint violation
          message = 'Referenced record not found'
          const fkMatch = error.detail?.match(/Key \(([^)]+)\)=\(([^)]+)\)/)
          if (fkMatch) {
            errors = [{
              field: fkMatch[1],
              message: `Referenced ${fkMatch[1].replace('_id', '')} with ID '${fkMatch[2]}' does not exist`,
              constraint: 'foreign_key',
              value: fkMatch[2],
            }]
          } else {
            errors = [{ message: error.detail || 'Referenced record does not exist' }]
          }
          break
          
        case '23502': // Not null constraint violation
          message = 'Required field missing'
          const columnMatch = error.message?.match(/column "([^"]+)"/)
          if (columnMatch) {
            errors = [{
              field: columnMatch[1],
              message: `Field '${columnMatch[1]}' is required and cannot be null`,
              constraint: 'not_null',
            }]
          } else {
            errors = [{ message: 'A required field is missing' }]
          }
          break
          
        case '23514': // Check constraint violation
          message = 'Invalid data value'
          errors = [{
            message: error.detail || 'Data does not meet the required constraints',
            constraint: 'check',
          }]
          break
          
        case '22P02': // Invalid text representation
          message = 'Invalid data format'
          errors = [{
            message: 'Invalid UUID format or data type mismatch',
            constraint: 'data_type',
          }]
          break
          
        default:
          message = 'Database operation failed'
          errors = [{
            message: error.message || 'An error occurred while processing your request',
          }]
      }
    }
    // Handle generic errors
    else if (exception instanceof Error) {
      message = exception.message
      
      // Try to extract field information from error message
      if (exception.message.includes('not found')) {
        status = HttpStatus.NOT_FOUND
      } else if (exception.message.includes('already exists')) {
        status = HttpStatus.CONFLICT
      } else if (
        exception.message.includes('required') ||
        exception.message.includes('cannot be') ||
        exception.message.includes('must be')
      ) {
        status = HttpStatus.BAD_REQUEST
      }
    }

    const errorResponse = {
      success: false,
      message,
      statusCode: status,
      errors: errors.length > 0 ? errors : undefined,
      data: null,
      timestamp: new Date().toISOString(),
      path: request.url,
    }

    response.status(status).json(errorResponse)
  }
}