# ตัวอย่าง Error Response

## 1. Validation Error (400 Bad Request)

### กรณี: ลืมกรอก required fields
```json
{
  "success": false,
  "message": "Validation failed",
  "statusCode": 400,
  "errors": [
    "vehicle_registration is required and cannot be empty",
    "customer_firstname is required and cannot be empty",
    "customer_contact is required and cannot be empty"
  ],
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks"
}
```

### กรณี: Format ไม่ถูกต้อง
```json
{
  "success": false,
  "message": "Invalid phone number format",
  "statusCode": 400,
  "errors": [
    {
      "field": "customer_contact",
      "message": "Phone number must be 9-10 digits",
      "constraint": "format"
    }
  ],
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks"
}
```

### กรณี: Invalid data type
```json
{
  "success": false,
  "message": "Validation failed",
  "statusCode": 400,
  "errors": [
    "created_by must be a valid UUID",
    "branch_booked must be one of the allowed values"
  ],
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks"
}
```

## 2. Database Constraint Errors

### กรณี: Unique Constraint Violation (23505)
```json
{
  "success": false,
  "message": "Duplicate entry found",
  "statusCode": 400,
  "errors": [
    {
      "field": "appointment_running",
      "message": "Value 'APT-2024-001' already exists",
      "constraint": "unique",
      "value": "APT-2024-001"
    }
  ],
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks"
}
```

### กรณี: Foreign Key Constraint Violation (23503)
```json
{
  "success": false,
  "message": "Referenced record not found",
  "statusCode": 400,
  "errors": [
    {
      "field": "created_by",
      "message": "Referenced created_by with ID '123e4567-e89b-12d3-a456-426614174000' does not exist",
      "constraint": "foreign_key",
      "value": "123e4567-e89b-12d3-a456-426614174000"
    }
  ],
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks"
}
```

### กรณี: Not Null Constraint Violation (23502)
```json
{
  "success": false,
  "message": "Required field missing",
  "statusCode": 400,
  "errors": [
    {
      "field": "vehicle_registration",
      "message": "Field 'vehicle_registration' is required and cannot be null",
      "constraint": "not_null"
    }
  ],
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks"
}
```

### กรณี: Invalid UUID Format (22P02)
```json
{
  "success": false,
  "message": "Invalid data format",
  "statusCode": 400,
  "errors": [
    {
      "message": "Invalid UUID format or data type mismatch",
      "constraint": "data_type"
    }
  ],
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks/invalid-uuid"
}
```

## 3. Not Found Error (404)

```json
{
  "success": false,
  "message": "Task with id 123e4567-e89b-12d3-a456-426614174000 not found",
  "statusCode": 404,
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks/123e4567-e89b-12d3-a456-426614174000"
}
```

## 4. Business Logic Error

### กรณี: Duplicate appointment running
```json
{
  "success": false,
  "message": "Duplicate appointment running number",
  "statusCode": 400,
  "errors": [
    {
      "field": "appointment_running",
      "message": "Appointment running number 'APT-2024-001' already exists",
      "constraint": "unique",
      "value": "APT-2024-001"
    }
  ],
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks"
}
```

### กรณี: Invalid date format
```json
{
  "success": false,
  "message": "Invalid date format",
  "statusCode": 400,
  "errors": [
    {
      "field": "date_booked",
      "message": "Date must be in format YYYY-MM-DD",
      "constraint": "format"
    }
  ],
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks"
}
```

### กรณี: Invalid time format
```json
{
  "success": false,
  "message": "Invalid time format",
  "statusCode": 400,
  "errors": [
    {
      "field": "time_booked",
      "message": "Time must be in format HH:MM (24-hour)",
      "constraint": "format"
    }
  ],
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks"
}
```

## 5. Unauthorized Error (401)

```json
{
  "success": false,
  "message": "Unauthorized",
  "statusCode": 401,
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks"
}
```

## 6. Internal Server Error (500)

```json
{
  "success": false,
  "message": "Internal server error",
  "statusCode": 500,
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks"
}
```

## สรุปโครงสร้าง Error Response

ทุก error response จะมีโครงสร้างดังนี้:

```typescript
{
  success: false,              // บอกว่า request ไม่สำเร็จ
  message: string,             // ข้อความอธิบาย error หลัก
  statusCode: number,          // HTTP status code
  errors?: ErrorDetail[],      // รายละเอียด error แต่ละฟิลด์ (optional)
  data: null,                  // ไม่มีข้อมูลเมื่อเกิด error
  timestamp: string,           // เวลาที่เกิด error
  path: string                 // endpoint ที่เกิด error
}
```

### โครงสร้าง ErrorDetail

```typescript
{
  field?: string,       // ชื่อฟิลด์ที่เกิด error (ถ้ามี)
  message: string,      // ข้อความอธิบาย error
  constraint?: string,  // ประเภทของ constraint ที่ละเมิด
  value?: any          // ค่าที่ทำให้เกิด error (ถ้ามี)
}
```

## ตัวอย่าง Required Fields สำหรับ Task

Fields ที่ห้ามเว้นว่าง (required):
- `vehicle_registration` - ทะเบียนรถ
- `customer_firstname` - ชื่อลูกค้า
- `customer_lastname` - นามสกุลลูกค้า
- `customer_contact` - เบอร์โทรลูกค้า
- `date_booked` - วันที่นัดหมาย (YYYY-MM-DD)
- `time_booked` - เวลานัดหมาย (HH:MM)
- `branch_booked` - สาขาที่นัดหมาย
- `created_by` - UUID ของผู้สร้าง

Fields ที่เป็น optional:
- `walk_in_flag` - ลูกค้า walk-in หรือไม่
- `appointment_running` - เลขที่นัดหมาย (ต้องไม่ซ้ำ)
- `vehicle_registration_province` - จังหวัดทะเบียนรถ
- `responsible` - รายชื่อผู้รับผิดชอบ
- `vin_number` - หมายเลข VIN
- `engine_number` - หมายเลขเครื่องยนต์
- `chassis_number` - หมายเลขแชสซี
- `lift` - ตำแหน่งลิฟท์
- `car_type` - ประเภทรถ
- `car_brand` - ยี่ห้อรถ
- `status_repair_order` - สถานะใบสั่งซ่อม
- `status_report` - สถานะรายงาน
