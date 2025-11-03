import { SignatureCustomer } from 'src/shared/enum/task-detail-step-four'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Tasks } from '../task.entity'

@Entity('task_detail_step_four')
export class TaskDetailStepFourEntity {
  // Define your entity columns and relations here
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid' })
  task_id: string

  @Column({ type: 'varchar', nullable: true })
  signature_customer: string

  @Column({ type: 'enum', enum: SignatureCustomer, default: SignatureCustomer.SIGNED })
  signature_status: SignatureCustomer

  @Column({ type: 'boolean', default: false })
  customer_absent_flag: boolean

  @Column({ type: 'boolean', default: false })
  success_flag: boolean

  @CreateDateColumn({ type: 'timestamp with time zone', nullable: false })
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
