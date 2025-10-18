import {
  Cargo,
  SpareTire,
  TireCondition,
  TireDamage,
  TireDepth,
  TruckToolSet,
  WheelControlCover,
} from 'src/shared/enum/task-detail-step-two'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Tasks } from '../task.entity'

@Entity('task_detail_step_two')
export class TaskDetailStepTwoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', nullable: false })
  task_id: string

  @Column({ type: 'enum', enum: SpareTire, nullable: true })
  spare_tire: SpareTire

  @Column({ type: 'enum', enum: WheelControlCover, nullable: true })
  wheel_control_cover: WheelControlCover

  //เฉพาะรถบรรทุก
  @Column({ type: 'enum', enum: Cargo, nullable: true })
  cargo: Cargo

  //เฉพาะรถบรรทุก
  @Column({ type: 'enum', enum: TruckToolSet, nullable: true })
  truck_tool_set: TruckToolSet

  @Column({ type: 'varchar', nullable: true })
  left_front_tire_year: string

  @Column({ type: 'varchar', nullable: true })
  right_front_tire_year: string

  @Column({ type: 'varchar', nullable: true })
  left_back_tire_year: string

  @Column({ type: 'varchar', nullable: true })
  right_back_tire_year: string

  @Column({ type: 'integer', nullable: true })
  left_front_tire_pressure: number

  @Column({ type: 'integer', nullable: true })
  right_front_tire_pressure: number

  @Column({ type: 'integer', nullable: true })
  left_back_tire_pressure: number

  @Column({ type: 'integer', nullable: true })
  right_back_tire_pressure: number

  @Column({ type: 'enum', enum: TireDepth, nullable: true })
  left_front_tire_depth: TireDepth

  @Column({ type: 'enum', enum: TireDepth, nullable: true })
  right_front_tire_depth: TireDepth

  @Column({ type: 'enum', enum: TireDepth, nullable: true })
  left_back_tire_depth: TireDepth

  @Column({ type: 'enum', enum: TireDepth, nullable: true })
  right_back_tire_depth: TireDepth

  @Column({ type: 'enum', enum: TireCondition, nullable: true })
  left_front_tire_condition: TireCondition

  @Column({ type: 'enum', enum: TireCondition, nullable: true })
  right_front_tire_condition: TireCondition

  @Column({ type: 'enum', enum: TireCondition, nullable: true })
  left_back_tire_condition: TireCondition

  @Column({ type: 'enum', enum: TireCondition, nullable: true })
  right_back_tire_condition: TireCondition

  @Column({ type: 'enum', enum: TireDamage, nullable: true })
  left_front_tire_damage: TireDamage

  @Column({ type: 'enum', enum: TireDamage, nullable: true })
  right_front_tire_damage: TireDamage

  @Column({ type: 'enum', enum: TireDamage, nullable: true })
  left_back_tire_damage: TireDamage

  @Column({ type: 'enum', enum: TireDamage, nullable: true })
  right_back_tire_damage: TireDamage

  @Column({ type: 'boolean', default: false })
  success_flag: boolean

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date

  @Column({ type: 'uuid', nullable: true })
  created_by: string

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true})
  updated_at: Date

  @Column({ type: 'uuid', nullable: true })
  updated_by: string

  @ManyToOne(() => Tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'task_id' })
  task: Tasks
}
