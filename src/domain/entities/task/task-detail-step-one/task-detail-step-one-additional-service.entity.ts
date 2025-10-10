import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TaskDetailStepOneEntity } from './task-detail-step-one.entity'

@Entity('task_detail_step_one_additional_service')
export class TaskDetailStepOneAdditionalServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Column({ type: 'uuid', nullable: false })
  task_detail_step_one_id: string

  @Column({ type: 'varchar', array: true, nullable: true })
  additional_image: string[]

  @Column({ type: 'varchar', nullable: true })
  comment: string

  @ManyToOne(() => TaskDetailStepOneEntity)
  @JoinColumn({ name: 'task_detail_step_one_id' })
  taskDetailStepOne: TaskDetailStepOneEntity
}
