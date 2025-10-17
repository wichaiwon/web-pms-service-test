# Web PMS Service API Documentation

## Overview

Web PMS (Property Management System) Service API provides comprehensive endpoints for managing property maintenance tasks, vehicle service appointments, and detailed inspection processes.

## Features

- 🔐 **JWT Authentication** - Secure API access with role-based permissions
- 📋 **Task Management** - Create, update, and track maintenance tasks
- 🔍 **Multi-step Inspections** - Detailed 4-step vehicle inspection process
- 👥 **User Management** - Support for mechanics, admins, and service advisors
- 🏢 **Multi-branch Operations** - Support for different service locations

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (create `.env` file)
4. Run database migrations
5. Start the development server:
   ```bash
   npm run start:dev
   ```

### API Documentation

Once the server is running, access the interactive API documentation at:

- **Swagger UI**: `http://localhost:3000/api`
- **JSON Schema**: `http://localhost:3000/api-json`

## Authentication

The API uses JWT (JSON Web Token) for authentication. Most endpoints require a valid JWT token.

### Getting Started with Authentication

1. **Register a new user** (if needed):
   ```bash
   POST /auth/register
   ```

2. **Login to get JWT token**:
   ```bash
   POST /auth/login
   ```

3. **Use the token** in subsequent requests:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## API Endpoints Overview

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get user profile
- `PATCH /auth/change-password` - Change password

### Tasks
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create new task
- `GET /tasks/{id}` - Get task by ID
- `PUT /tasks/{id}` - Update task
- `GET /tasks/responsible/{userId}` - Get tasks by responsible user
- `GET /tasks/status/{status}` - Get tasks by status

### Task Details (Multi-step Process)
1. **Step 1 - Vehicle Damage Assessment**
2. **Step 2 - Tire and Equipment Inspection**
3. **Step 3 - Battery and Electrical Tests**
4. **Step 4 - Customer Signature and Completion**

## Data Models

### Task
```typescript
{
  id: string                    // UUID
  appointment_running: string   // Appointment number
  vehicle_registration: string  // License plate
  customer_firstname: string    // Customer first name
  customer_lastname: string     // Customer last name
  customer_contact: string      // Phone number
  date_booked: string          // Booking date
  time_booked: string          // Booking time
  car_type: CarType            // Vehicle type (LCV/CV)
  car_brand: CarBrand          // Vehicle brand
  branch_book: Branch          // Service branch
  // ... additional fields
}
```

### Enums

#### CarBrand
- `ISUZU` - รถยนต์ ISUZU
- `OTHER` - รถยนต์ยี่ห้ออื่น

#### CarType
- `LCV` - รถยนต์ขนาดเล็ก (LCV)
- `CV` - รถยนต์ขนาดใหญ่ (CV)

#### Branch
- `HEAD_OFFICE` - สำนักงานใหญ่
- `SOIDAO` - สาขาสอยดาว
- `NAYAIAM` - สาขานายายอาม
- `KHLUNG` - สาขาขลุง

#### UserRole
- `ADMIN` - Administrator
- `SA` - Service Advisor
- `CHIEF_MECHANIC` - Chief Mechanic
- `MECHANIC` - Mechanic

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid or missing JWT)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Examples

### Login Example
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "mirai_id": "405680518",
    "password": "1234567890"
  }'
```

### Create Task Example
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "appointment_running": "APT-2024-001",
    "vehicle_registration": "กข 1234",
    "customer_firstname": "สมชาย",
    "customer_lastname": "ใจดี",
    "customer_contact": "0812345678",
    "date_booked": "2024-10-17",
    "time_booked": "09:00",
    "car_type": "LCV",
    "car_brand": "ISUZU",
    "branch_book": "HEAD_OFFICE",
    "created_by": "123e4567-e89b-12d3-a456-426614174000"
  }'
```

## Development

### Available Scripts

- `npm run start` - Start production server
- `npm run start:dev` - Start development server with hot reload
- `npm run start:debug` - Start server in debug mode
- `npm run build` - Build the application
- `npm run test` - Run tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint

### Technology Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport
- **Validation**: Class-validator
- **Documentation**: Swagger/OpenAPI
- **Language**: TypeScript

## Support

For API support and questions, please refer to the interactive Swagger documentation at `/api` endpoint when the server is running.