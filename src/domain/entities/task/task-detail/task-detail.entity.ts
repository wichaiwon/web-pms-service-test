import { FuelLevel } from 'src/shared/enum/task-detail'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Tasks } from '../task.entity'

@Entity('task_detail')
export class TaskDetailEntity {
  // Define columns and relationships here
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  task_id: string

  @Column({ type: 'varchar', nullable: false })
  task_detail_image1: string

  @Column({ type: 'varchar', nullable: false })
  task_detail_image2: string

  @Column({ type: 'integer', nullable: true })
  car_mileage: number

  @Column({ type: 'enum', enum: FuelLevel, nullable: false })
  fuel_level: FuelLevel

  @Column({ type: 'boolean', default: false })
  success_flag: boolean

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({ type: 'uuid', nullable: true })
  created_by: string

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updated_at: Date

  @Column({ type: 'uuid', nullable: true })
  updated_by: string

  // Relations
  @ManyToOne(() => Tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Tasks
}
