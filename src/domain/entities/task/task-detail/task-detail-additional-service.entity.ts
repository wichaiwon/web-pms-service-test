import { AdditionalService, TirePressure } from 'src/shared/enum/task-detail'
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { TaskDetailEntity } from './task-detail.entity'

@Entity('task_detail_additional_service')
export class TaskDetailAdditionalServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: false })
  task_detail_id: string

  @Column({ type: 'varchar', nullable: true })
  session_id: string

  @Column({ type: 'enum', enum: TirePressure, nullable: false })
  tire_pressure: TirePressure

  @Column({ type: 'enum', enum: AdditionalService, array: true, nullable: true })
  additional_service: AdditionalService[]

  @Column({ type: 'integer', nullable: true })
  front_tire_pressure: number

  @Column({ type: 'integer', nullable: true })
  back_tire_pressure: number

  @Column({ type: 'varchar', nullable: true })
  comment: string

  // Relations
  @ManyToOne(() => TaskDetailEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_detail_id' })
  taskDetail: TaskDetailEntity
}
