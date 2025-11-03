import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TaskDetailStepTwoEntity } from './task-detail-step-two.entity'

@Entity('task_detail_step_two_additional_service')
export class TaskDetailStepTwoAdditionalServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: false })
  task_detail_step_two_id: string

  @Column({ type: 'varchar', array: true, nullable: true })
  left_front_tire_image: string[]

  @Column({ type: 'varchar', array: true, nullable: true })
  right_front_tire_image: string[]

  @Column({ type: 'varchar', array: true, nullable: true })
  left_back_tire_image: string[]

  @Column({ type: 'varchar', array: true, nullable: true })
  right_back_tire_image: string[]

  @Column({ type: 'varchar', nullable: true })
  comment: string

  @ManyToOne(() => TaskDetailStepTwoEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_detail_step_two_id' })
  task_detail_step_two: TaskDetailStepTwoEntity
}
