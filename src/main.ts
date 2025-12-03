import { NestFactory } from '@nestjs/core'
import { ValidationPipe, BadRequestException, HttpStatus } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { GlobalExceptionFilter } from './common/filters/global-exception.filter'
import { ValidationError } from 'class-validator'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Enable CORS
  app.enableCors({
    origin: true, // Allow all origins in development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })

  // Enable validation pipes globally
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: {
        target: false,
        value: false,
      },
      exceptionFactory: (errors: ValidationError[]) => {
        const result = errors.map((error) => {
          const constraints = error.constraints
          const field = error.property
          const value = error.value
          
          if (constraints) {
            const constraintKeys = Object.keys(constraints)
            const constraintType = constraintKeys[0]
            let message = constraints[constraintType]
            
            // Make messages more user-friendly with detailed information
            if (constraintType === 'isNotEmpty') {
              message = `'${field}' is required and cannot be empty`
            } else if (constraintType === 'isString') {
              message = `'${field}' must be a text value (received: ${typeof value})`
            } else if (constraintType === 'isNumber') {
              message = `'${field}' must be a number (received: ${typeof value})`
            } else if (constraintType === 'isUuid') {
              message = `'${field}' must be a valid UUID format (received: ${value})`
            } else if (constraintType === 'isEnum') {
              // Try to get allowed values from error message or context
              const originalMessage = constraints[constraintType]
              const enumMatch = originalMessage?.match(/must be one of the following values: (.+)/)
              if (enumMatch) {
                message = `'${field}' must be one of: ${enumMatch[1]} (received: "${value}")`
              } else {
                message = `'${field}' must be one of the allowed enum values (received: "${value}")`
              }
            } else if (constraintType === 'isBoolean') {
              message = `'${field}' must be a boolean value (true/false) (received: ${value})`
            } else if (constraintType === 'isArray') {
              message = `'${field}' must be an array (received: ${typeof value})`
            } else if (constraintType === 'arrayNotEmpty') {
              message = `'${field}' array cannot be empty`
            }
            
            return {
              field,
              message,
              constraint: constraintType,
              value: value !== undefined ? value : null,
            }
          }
          
          return {
            field,
            message: `Validation failed for '${field}'`,
            value: value !== undefined ? value : null,
          }
        })
        
        return new BadRequestException({
          success: false,
          message: 'Validation failed - please check the errors below',
          errors: result,
          statusCode: HttpStatus.BAD_REQUEST,
        })
      },
    }),
  )

  // Enable global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter())

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Web PMS API')
    .setDescription(`
      ## Web PMS (Property Management System) Service API

      This API provides comprehensive endpoints for managing property maintenance tasks, 
      including vehicle service appointments, task management, and detailed inspection processes.

      ### Features:
      - **Authentication**: JWT-based authentication with role-based access
      - **Task Management**: Create, update, and track maintenance tasks
      - **Multi-step Inspections**: Detailed 4-step vehicle inspection process
      - **User Management**: Support for mechanics, admins, and service advisors
      - **Branch Operations**: Multi-branch support for different service locations

      ### Authentication:
      Most endpoints require JWT authentication. Use the login endpoint to obtain a token,
      then include it in the Authorization header as: \`Bearer <your-token>\`

      ### Response Format:
      All responses follow a consistent format:
      \`\`\`json
      {
        "success": true|false,
        "message": "Description of the operation result",
        "data": "Response data or null"
      }
      \`\`\`
    `)
    .setVersion('1.0.0')
    .setContact('API Support', 'https://example.com/support', 'support@example.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:8080', 'Development Server')
    .addServer('https://c31d16f2ab54.ngrok-free.app', 'Ngrok Tunnel Server')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header'
      },
      'Bearer'
    )
    .addTag('Authentication', 'User authentication and authorization')
    .addTag('Tasks', 'Task management operations')
    .addTag('Task Details', 'Detailed task information and steps')
    .addTag('Users', 'User management operations')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const port = 8080
  await app.listen(port)

  console.log(`Application is running on: http://localhost:${port}`)
  console.log(`Swagger docs available at: http://localhost:${port}/api`)
}
bootstrap()
