import { DamageCar } from 'src/shared/enum/task-detail-step-one'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Tasks } from '../task.entity'

@Entity('task_detail_step_one')
export class TaskDetailStepOneEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  task_id: string

  @Column({ type: 'enum', enum: DamageCar, nullable: false })
  damage_car: DamageCar

  @Column({ type: 'varchar', nullable: false })
  damage_car_image: string

  @Column({ type: 'boolean', default: false })
  success_flag: boolean

  @CreateDateColumn({ type: 'timestamp with time zone', nullable: false})
  created_at: Date

  @Column({ type: 'uuid', nullable: true })
  created_by: string

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true })
  updated_at: Date

  @Column({ type: 'uuid', nullable: true })
  updated_by: string

  @ManyToOne(() => Tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Tasks
}
