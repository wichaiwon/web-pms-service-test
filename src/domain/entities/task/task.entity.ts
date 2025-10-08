import { CarBrand, CarType, StatusRepairOrder, StatusReport } from 'src/shared/enum/task'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'boolean', default: false })
  walk_in_flag: boolean

  @Column({ type: 'varchar', nullable: true })
  vehicle_registration: string

  @Column({ type: 'varchar', nullable: false })
  engine: string

  @Column({ type: 'varchar', nullable: false })
  chassis: string

  @Column({ type: 'uuid', nullable: false })
  customer_id: string

  @Column({ type: 'uuid', array: true, nullable: true })
  responsible: string[]

  @Column({ type: 'boolean', default: false })
  success_flag: boolean

  @Column({ type: 'enum', enum: CarType, nullable: false })
  car_type: CarType

  @Column({ type: 'enum', enum: CarBrand, nullable: false })
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

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updated_at: Date

  @Column({ type: 'uuid', nullable: true })
  updated_by: string
}
