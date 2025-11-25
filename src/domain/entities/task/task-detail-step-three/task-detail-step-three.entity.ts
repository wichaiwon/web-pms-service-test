import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Tasks } from '../task.entity'

@Entity('task_detail_step_three')
export class TaskDetailStepThreeEntity {
  // Define columns and relationships here as needed
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  task_id: string

  @Column({ type: 'varchar', nullable: true })
  session_id: string

  @Column({ type: 'double precision', nullable: true })
  first_battery_voltage: number

  @Column({ type: 'numeric', nullable: true })
  first_measurement: number

  @Column({ type: 'numeric', nullable: true })
  first_rating: number

  @Column({ type: 'double precision', nullable: true })
  second_battery_voltage: number

  @Column({ type: 'numeric', nullable: true })
  second_measurement: number

  @Column({ type: 'numeric', nullable: true })
  second_rating: number

  @Column({ type: 'boolean', default: false })
  success_flag: boolean

  @CreateDateColumn({ type: 'timestamp with time zone',nullable: false})
  created_at: Date

  @Column({ type: 'uuid', nullable: true })
  created_by: string

  @Column({ type: 'timestamp with time zone', nullable: true })
  updated_at: Date

  @Column({ type: 'uuid', nullable: true })
  updated_by: string

  @ManyToOne(() => Tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Tasks
}
