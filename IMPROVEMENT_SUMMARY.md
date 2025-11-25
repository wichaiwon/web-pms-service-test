# สรุปการปรับปรุง Error Handling

## การเปลี่ยนแปลงหลัก

### 1. ✅ Global Exception Filter (`src/common/filters/global-exception.filter.ts`)

**ปรับปรุง:**
- รองรับ error หลายประเภท: Validation, Database Constraints, TypeORM errors
- แสดงรายละเอียด error ที่ชัดเจนขึ้น
- จัดการ PostgreSQL error codes:
  - `23505` - Unique constraint (ข้อมูลซ้ำ)
  - `23503` - Foreign key constraint (อ้างอิงข้อมูลที่ไม่มีอยู่)
  - `23502` - Not null constraint (ฟิลด์ที่ห้าม null)
  - `23514` - Check constraint (ข้อมูลไม่ตรงเงื่อนไข)
  - `22P02` - Invalid data format (UUID ไม่ถูกต้อง)

**ตัวอย่าง Response:**
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

### 2. ✅ Validation Pipe (`src/main.ts`)

**ปรับปรุง:**
- Custom error messages ที่เป็นมิตรกับผู้ใช้
- แสดงชื่อ field และข้อความแจ้ง error ที่ชัดเจน
- Support validation decorators: `@IsNotEmpty()`, `@IsString()`, `@IsNumber()`, `@IsUuid()`, `@IsEnum()`, `@IsBoolean()`, `@IsArray()`

**ตัวอย่าง Response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "statusCode": 400,
  "errors": [
    "vehicle_registration is required and cannot be empty",
    "customer_contact must be a text value",
    "created_by must be a valid UUID"
  ],
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks"
}
```

### 3. ✅ Create Task Use Case (`src/task/use-cases/create-task.use-case.ts`)

**เพิ่ม Business Validation:**
- ตรวจสอบ required fields ทั้งหมด
- Validate format:
  - เบอร์โทรศัพท์ (9-10 ตัวเลข)
  - วันที่ (YYYY-MM-DD)
  - เวลา (HH:MM รูปแบบ 24 ชั่วโมง)
- ตรวจสอบ duplicate `appointment_running`

**ตัวอย่าง Response:**
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

### 4. ✅ Task Controller (`src/task/task.controller.ts`)

**ปรับปรุง:**
- ลบ try-catch ออกจากทุก endpoint
- ให้ Global Exception Filter จัดการ error แทน
- Code สะอาดและอ่านง่ายขึ้น

**Before:**
```typescript
async createTask(@Body() createTaskDto: CreateTaskDto) {
  try {
    const task = await this.taskService.createTask(createTaskDto)
    return { success: true, message: 'Task created successfully', data: task }
  } catch (error) {
    throw new HttpException({ success: false, message: error.message }, HttpStatus.BAD_REQUEST)
  }
}
```

**After:**
```typescript
async createTask(@Body() createTaskDto: CreateTaskDto) {
  const task = await this.taskService.createTask(createTaskDto)
  return { success: true, message: 'Task created successfully', data: task }
}
```

## ประเภท Error ที่รองรับ

### 1. Validation Errors (400)
- Required fields missing
- Invalid data type
- Invalid format

### 2. Database Constraint Errors (400)
- Unique constraint violation (ข้อมูลซ้ำ)
- Foreign key violation (อ้างอิงไม่ถูกต้อง)
- Not null violation (ฟิลด์ที่ต้องกรอก)
- Check constraint violation (ข้อมูลไม่ถูกต้อง)

### 3. Not Found Errors (404)
- Record not found

### 4. Conflict Errors (409)
- Duplicate entry

### 5. Unauthorized Errors (401)
- Invalid or missing JWT token

### 6. Internal Server Errors (500)
- Unexpected errors

## วิธีการทดสอบ

### 1. ทดสอบ Required Fields

```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{}'
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Required fields are missing",
  "statusCode": 400,
  "errors": [
    {
      "field": "vehicle_registration",
      "message": "vehicle_registration is required and cannot be empty",
      "constraint": "required"
    }
    // ... more errors
  ]
}
```

### 2. ทดสอบ Invalid Phone Format

```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "vehicle_registration": "กข 1234",
    "customer_firstname": "สมชาย",
    "customer_lastname": "ใจดี",
    "customer_contact": "123",
    "date_booked": "2024-11-25",
    "time_booked": "09:00",
    "branch_booked": "สำนักงานใหญ่",
    "created_by": "123e4567-e89b-12d3-a456-426614174000"
  }'
```

**Expected Response:**
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
  ]
}
```

### 3. ทดสอบ Duplicate Appointment Running

```bash
# สร้าง task ครั้งแรก
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "appointment_running": "APT-2024-001",
    "vehicle_registration": "กข 1234",
    "customer_firstname": "สมชาย",
    "customer_lastname": "ใจดี",
    "customer_contact": "0812345678",
    "date_booked": "2024-11-25",
    "time_booked": "09:00",
    "branch_booked": "สำนักงานใหญ่",
    "created_by": "123e4567-e89b-12d3-a456-426614174000"
  }'

# สร้าง task ซ้ำ
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "appointment_running": "APT-2024-001",
    "vehicle_registration": "กข 5678",
    "customer_firstname": "สมหญิง",
    "customer_lastname": "ใจงาม",
    "customer_contact": "0823456789",
    "date_booked": "2024-11-25",
    "time_booked": "10:00",
    "branch_booked": "สำนักงานใหญ่",
    "created_by": "123e4567-e89b-12d3-a456-426614174000"
  }'
```

**Expected Response:**
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
  ]
}
```

### 4. ทดสอบ Invalid UUID

```bash
curl -X GET http://localhost:8080/tasks/invalid-uuid \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
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
  ]
}
```

### 5. ทดสอบ Not Found

```bash
curl -X GET http://localhost:8080/tasks/123e4567-e89b-12d3-a456-426614174999 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Task with id 123e4567-e89b-12d3-a456-426614174999 not found",
  "statusCode": 404,
  "data": null,
  "timestamp": "2024-11-25T10:30:00.000Z",
  "path": "/tasks/123e4567-e89b-12d3-a456-426614174999"
}
```

## ข้อดีของการปรับปรุง

1. **✅ Error Messages ชัดเจนขึ้น**
   - บอกชื่อฟิลด์ที่เกิดปัญหา
   - อธิบายสาเหตุที่ชัดเจน
   - แนะนำวิธีแก้ไข

2. **✅ Centralized Error Handling**
   - จัดการ error ที่เดียว (Global Exception Filter)
   - Code สะอาดและบำรุงรักษาง่าย
   - Consistent error format

3. **✅ Database Constraint Handling**
   - จัดการ constraint errors ทั้งหมด
   - แปล PostgreSQL error codes เป็นข้อความที่อ่านง่าย
   - แสดงค่าที่ทำให้เกิด error

4. **✅ Business Validation**
   - Validate format ข้อมูล
   - ตรวจสอบความถูกต้องก่อนบันทึกข้อมูล
   - ป้องกันข้อมูลผิดพลาด

5. **✅ Developer-Friendly**
   - Error response มี timestamp และ path
   - แสดง constraint type
   - ง่ายต่อการ debug

## ไฟล์ที่เกี่ยวข้อง

- `src/common/filters/global-exception.filter.ts` - Global Exception Filter
- `src/main.ts` - Validation Pipe Configuration
- `src/task/use-cases/create-task.use-case.ts` - Business Validation
- `src/task/task.controller.ts` - Task Controller
- `ERROR_RESPONSE_EXAMPLES.md` - ตัวอย่าง Error Response ทั้งหมด

## Required Fields สำหรับ Task

**ฟิลด์ที่ต้องกรอก:**
- ✅ `vehicle_registration` - ทะเบียนรถ
- ✅ `customer_firstname` - ชื่อลูกค้า
- ✅ `customer_lastname` - นามสกุลลูกค้า
- ✅ `customer_contact` - เบอร์โทรลูกค้า (9-10 ตัวเลข)
- ✅ `date_booked` - วันที่นัดหมาย (YYYY-MM-DD)
- ✅ `time_booked` - เวลานัดหมาย (HH:MM)
- ✅ `branch_booked` - สาขาที่นัดหมาย
- ✅ `created_by` - UUID ของผู้สร้าง

**ฟิลด์ที่เป็น Optional:**
- `walk_in_flag`
- `appointment_running` (ต้องไม่ซ้ำ)
- `vehicle_registration_province`
- `responsible`
- `vin_number`
- `engine_number`
- `chassis_number`
- `lift`
- `car_type`
- `car_brand`
- `status_repair_order`
- `status_report`
