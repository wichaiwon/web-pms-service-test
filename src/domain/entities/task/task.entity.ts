import { CarBrand, CarType, StatusRepairOrder, StatusReport } from 'src/shared/enum/task'
import { Branch } from 'src/shared/enum/user'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('tasks')
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'boolean', default: false })
  walk_in_flag: boolean
  
  @Column({ type: 'boolean', default: false })
  in_process_flag: boolean

  @Column({ type: 'varchar', nullable: true, unique: true })
  appointment_running: string

  @Column({ type: 'varchar', nullable: true })
  model_number: string

  @Column({ type: 'varchar', nullable: true })
  model_name: string

  @Column({ type: 'varchar', nullable: true })
  vehicle_registration: string

  @Column({ type: 'varchar', nullable: true })
  vehicle_registration_province: string

  @Column({ type: 'varchar', nullable: true })
  customer_firstname: string

  @Column({ type: 'varchar', nullable: true })
  customer_lastname: string

  @Column({ type: 'varchar', nullable: true })
  customer_contact: string

  @Column({ type: 'varchar', nullable: false })
  date_booked: string

  @Column({ type: 'varchar', nullable: false })
  time_booked: string

  @Column({ type: 'uuid', array: true, nullable: true, default: [] })
  responsible: string[]

  @Column({ type: 'varchar', nullable: true })
  vin_number: string

  @Column({ type: 'varchar', nullable: true })
  engine_number: string

  @Column({ type: 'varchar', nullable: true })
  chassis_number: string

  @Column({ type: 'enum', enum: Branch, nullable: false })
  branch_booked: Branch

  @Column({ type: 'text', nullable: true })
  lift: string

  @Column({ type: 'boolean', default: false })
  success_flag: boolean

  @Column({ type: 'enum', enum: CarType, nullable: true })
  car_type: CarType

  @Column({ type: 'enum', enum: CarBrand, nullable: true })
  car_brand: CarBrand

  @Column({ type: 'enum', enum: StatusRepairOrder, default: StatusRepairOrder.NOT_OPENED })
  status_repair_order: StatusRepairOrder

  @Column({ type: 'enum', enum: StatusReport, default: StatusReport.NOT_ISSUED })
  status_report: StatusReport

  @Column({ type: 'boolean', default: true })
  is_active: boolean

  @CreateDateColumn({ type: 'timestamp with time zone', nullable: false })
  created_at: Date

  @Column({ type: 'uuid', nullable: false })
  created_by: string

  @Column({ type: 'timestamp with time zone', nullable: true })
  updated_at: Date

  @Column({ type: 'uuid', nullable: true })
  updated_by: string
}
