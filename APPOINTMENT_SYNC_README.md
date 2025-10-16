# Appointment Synchronization System

ระบบนี้จะดึงข้อมูล appointments จาก External API และบันทึกลงตาราง `tasks` ในฐานข้อมูลโดยอัตโนมัติ

## คุณสมบัติ

- **Auto Sync**: ทำงานทุก 10 นาทีผ่าน Cron Job
- **Manual Trigger**: สามารถเรียกใช้งานด้วยตนเองผ่าน API endpoint
- **Data Mapping**: แปลงข้อมูล appointments เป็นรูปแบบของ task entity
- **Duplicate Prevention**: ตรวจสอบและป้องกันข้อมูลซ้ำ
- **Error Handling**: จัดการ errors และ logging ครบถ้วน

## API Endpoints

### 1. ทดสอบการเชื่อมต่อ External API
```
GET /appointment-sync/test-api
```

**Response:**
```json
{
  "success": true,
  "message": "External API connection successful",
  "appointmentCount": 50,
  "sampleAppointment": { ... },
  "timestamp": "2025-10-16T10:30:00.000Z"
}
```

### 2. เรียกใช้ Sync แบบ Manual
```
POST /appointment-sync/trigger
```

**Response:**
```json
{
  "success": true,
  "message": "Appointment synchronization completed successfully",
  "timestamp": "2025-10-16T10:30:00.000Z"
}
```

### 3. ตรวจสอบสถานะระบบ
```
GET /appointment-sync/status
```

**Response:**
```json
{
  "success": true,
  "message": "Appointment sync service is running",
  "cronSchedule": "0 */10 * * * * (Every 10 minutes)",
  "timezone": "Asia/Bangkok",
  "externalApiUrl": "https://n8n-pmsg.agilesoftgroup.com/webhook/pms-service/appointment",
  "timestamp": "2025-10-16T10:30:00.000Z"
}
```

## การตั้งค่า Cron Job

ระบบใช้ `@nestjs/schedule` สำหรับจัดการ Cron Jobs:

```typescript
@Cron('0 */10 * * * *', {
  name: 'sync-appointments',
  timeZone: 'Asia/Bangkok',
})
```

- **รูปแบบ**: `วินาที นาที ชั่วโมง วัน เดือน วันในสัปดาห์`
- **ตั้งค่าปัจจุบัน**: `0 */10 * * * *` = ทุก 10 นาที
- **เขตเวลา**: Asia/Bangkok

## การ Map ข้อมูล

### จาก Appointment API เป็น Task Entity

| Appointment Field | Task Field | หมายเหตุ |
|-------------------|------------|----------|
| `running` | `chassis_number` | ใช้เป็น unique identifier |
| `service_date_license` | `vehicle_registration` | ทะเบียนรถ |
| `machine` | `engine_number` | เลขเครื่องยนต์ |
| `channel` | `walk_in_flag` | `true` ถ้า = "รับหน้าร้าน" |
| `group_car` | `car_type` | LCV/CV ตาม group |
| `status_appointments` | `status_repair_order` | Map สถานะ |

### Car Type Mapping

| Group Car | Car Type |
|-----------|----------|
| รถเล็ก, LCV | `CarType.LCV` |
| รถใหญ่, CV | `CarType.CV` |

### Status Mapping

| Appointment Status | Repair Order Status |
|-------------------|---------------------|
| ยืนยันแล้ว | `StatusRepairOrder.CONFIRMED` |
| จองแล้ว | `StatusRepairOrder.NOT_OPENED` |

## System User

ระบบจะสร้าง System User อัตโนมัติสำหรับการดำเนินการ sync:

```typescript
{
  pkg_id_member: 'SYS001',
  name: 'System',
  surname: 'Sync Service',
  role: UserRole.ADMIN,
  mirai_id: 'system-sync',
  branch: Branch.HEAD_OFFICE
}
```

## การจัดการ Errors

### External API Errors
- **Connection Timeout**: 30 วินาที
- **Retry Logic**: ไม่มี auto-retry (จะ retry ใน cron cycle ถัดไป)
- **Logging**: บันทึกทุก error ใน application logs

### Database Errors
- **Duplicate Keys**: ข้ามการสร้าง record ซ้ำ
- **Constraint Violations**: Log error และข้าม record
- **Transaction Safety**: แต่ละ appointment ประมวลผลแยกกัน

## การใช้งาน

### 1. เริ่มต้นระบบ
```bash
npm run start:dev
```

### 2. ทดสอบ API Connection
```bash
curl -X GET http://localhost:3000/appointment-sync/test-api
```

### 3. Manual Sync
```bash
curl -X POST http://localhost:3000/appointment-sync/trigger
```

### 4. ตรวจสอบ Logs
```bash
# ใน application logs จะแสดง:
# - Cron job execution
# - API fetch results  
# - Sync statistics
# - Error details
```

## การ Monitor

### Sync Statistics
ระบบจะ log ผลการ sync ทุกครั้ง:
```
Appointment sync completed: 5 created, 2 updated, 43 skipped
```

### Error Monitoring
- Connection errors กับ External API
- Database constraint errors
- Data mapping errors
- Individual appointment processing errors

## การกำหนดค่า

### เปลี่ยน Cron Schedule
แก้ไขใน `appointment-sync.service.ts`:
```typescript
@Cron('0 */5 * * * *') // ทุก 5 นาที
@Cron('0 0 * * * *')   // ทุกชั่วโมง
@Cron('0 0 8 * * *')   // ทุกวันเวลา 8:00
```

### เปลี่ยน API Endpoint
แก้ไขใน `external-api.service.ts`:
```typescript
private readonly API_URL = 'your-new-api-endpoint';
```

### Timeout Settings
แก้ไขใน `schedule-services.module.ts`:
```typescript
HttpModule.register({
  timeout: 60000, // 60 seconds
  maxRedirects: 5,
})
```

## Troubleshooting

### ปัญหาที่พบบ่อย

1. **API Connection Failed**
   - ตรวจสอบ network connectivity
   - ตรวจสอบ API endpoint URL
   - ตรวจสอบ API authentication (ถ้ามี)

2. **Database Errors**
   - ตรวจสอบ database connection
   - ตรวจสอบ table schema
   - ตรวจสอบ foreign key constraints

3. **Cron Job ไม่ทำงาน**
   - ตรวจสอบ ScheduleModule ถูก import ใน AppModule
   - ตรวจสอบ service ถูก register เป็น provider
   - ตรวจสอบ logs สำหรับ cron execution

### Debug Mode
สำหรับการ debug สามารถเปิด detailed logging:
```typescript
private readonly logger = new Logger(AppointmentSyncService.name);

// เพิ่ม debug logs
this.logger.debug(`Processing appointment ${appointment.running}`);
```