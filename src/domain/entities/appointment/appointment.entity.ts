import { AppointmentResponseDto } from 'src/shared/types/appointment'
import { CreateTaskDto } from 'src/application/dto/tasks/create-task.dto'
import { Branch } from 'src/shared/enum/user'
import { CarType, CarBrand } from 'src/shared/enum/task'

export class AppointmentEntity implements AppointmentResponseDto {
  appointment_running: string
  vehicle_registration: string
  vehicle_registration_province: string
  customer_firstname: string
  customer_lastname: string
  customer_contact: string
  model_number?: string
  model_name?: string
  engine_number: string
  vin_number: string
  chassis_number: string
  date_booked: string
  time_booked: string
  branch_booked: Branch
  lift: string
  responsible: string
  car_type?: string
  car_brand?: string
  constructor(data: AppointmentResponseDto) {
    Object.assign(this, data)
  }
  getResponsibleNames(): { firstname: string; lastname: string } {
    const names = this.responsible.trim().split(' ')
    const firstname = names[0] || ''
    const lastname = names.slice(1).join(' ') || ''
    return { firstname, lastname }
  }
  toTaskData(userId: string): CreateTaskDto {
    if (!this.branch_booked) {
      throw new Error(`branch_booked is required for appointment ${this.appointment_running}`)
    }
    
    // Convert string values to enum
    let carType: CarType | undefined;
    let carBrand: CarBrand | undefined;
    
    // Map car_type from n8n to enum
    if (this.car_type) {
      const typeUpper = this.car_type.toUpperCase().trim();
      if (typeUpper === 'LCV' || typeUpper.includes('LCV')) {
        carType = CarType.LCV;
      } else if (typeUpper === 'CV' || typeUpper.includes('CV')) {
        carType = CarType.CV;
      } else if (Object.values(CarType).includes(this.car_type as CarType)) {
        // If it's already the enum value (Thai text)
        carType = this.car_type as CarType;
      }
    }
    
    // Map car_brand from n8n to enum
    if (this.car_brand) {
      const brandUpper = this.car_brand.toUpperCase().trim();
      if (brandUpper === 'ISUZU' || brandUpper.includes('ISUZU')) {
        carBrand = CarBrand.ISUZU;
      } else if (Object.values(CarBrand).includes(this.car_brand as CarBrand)) {
        // If it's already the enum value (Thai text)
        carBrand = this.car_brand as CarBrand;
      } else {
        // Default to OTHER for any other brand
        carBrand = CarBrand.OTHER;
      }
    }
    
    return {
      walk_in_flag: false,
      appointment_running: this.appointment_running,
      vehicle_registration: this.vehicle_registration,
      vehicle_registration_province: this.vehicle_registration_province,
      customer_firstname: this.customer_firstname,
      customer_lastname: this.customer_lastname,
      customer_contact: this.customer_contact,
      model_number: this.model_number,
      model_name: this.model_name,
      vin_number: this.vin_number,
      engine_number: this.engine_number,
      chassis_number: this.chassis_number,
      date_booked: this.date_booked,
      time_booked: this.time_booked,
      responsible: [userId],
      branch_booked: this.branch_booked,
      lift: this.lift,
      car_type: carType,
      car_brand: carBrand,
      created_by: userId,
    }
  }

}
