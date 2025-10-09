import { damageCar } from 'src/shared/enum/task-detail-step-one'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Tasks } from '../task.entity'

@Entity('task_detail_step_one')
export class TaskDetailStepOne {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  task_id: string

  @Column({ type: 'enum', enum: damageCar, nullable: false })
  damage_car: damageCar

  @Column({ type: 'varchar', nullable: false })
  damage_car_image: string

  @Column({ type: 'boolean', default: false })
  success_flag: boolean

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({ type: 'uuid', nullable: true })
  created_by: string

  @Column({ type: 'timestamp with time zone', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date

  @Column({ type: 'uuid', nullable: true })
  updated_by: string

  @ManyToOne(() => Tasks)
  @JoinColumn({ name: 'task_id' })
  task: Tasks
}
