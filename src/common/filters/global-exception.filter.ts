import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    
    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Internal server error'
    
    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message || exception.message
      }
    } else if (exception instanceof Error) {
      message = exception.message
    }

    const errorResponse = {
      success: false,
      message,
      data: null,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    }

    response.status(status).json(errorResponse)
  }
}