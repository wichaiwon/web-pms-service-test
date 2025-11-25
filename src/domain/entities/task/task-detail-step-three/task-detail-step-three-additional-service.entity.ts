import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { TaskDetailStepThreeEntity } from './task-detail-step-three.entity'

@Entity('task_detail_step_three_additional_service')
export class TaskDetailStepThreeAdditionalServiceEntity {
  // Define columns and relationships here as needed
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  task_detail_step_three_id: string

  @Column({ type: 'varchar', nullable: true })
  session_id: string

  @Column({ type: 'varchar', array: true, nullable: true })
  first_battery_voltage_image: string[]

  @Column({ type: 'varchar', array: true, nullable: true })
  second_battery_voltage_image: string[]

  @Column({ type: 'varchar', nullable: true })
  comment: string

  @ManyToOne(() => TaskDetailStepThreeEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_detail_step_three_id' })
  task_detail_step_three: TaskDetailStepThreeEntity
}
