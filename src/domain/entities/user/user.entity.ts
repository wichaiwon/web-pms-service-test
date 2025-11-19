import { Branch, UserRole } from 'src/shared/enum/user'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  pkg_id_member: string

  @Column({ unique: true, nullable: true })
  email: string

  @Column({ nullable: false })
  firstname: string

  @Column({ nullable: false })
  lastname: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MECHANIC,
    nullable: false,
  })
  role: UserRole

  @Column({ unique: true, nullable: false })
  mirai_id: string

  @Column({ nullable: false })
  password: string // Hashed password

  @Column({ nullable: true })
  mirai_password: string
  
  @Column({ nullable: true, type: 'timestamp with time zone' })
  password_updated_at: Date

  @Column({ nullable: true })
  pin_code: string

  @Column({ type: 'enum', nullable: false, enum: Branch, default: Branch.HEAD_OFFICE })
  branch: Branch

  @Column({ nullable: false })
  is_active: boolean

  @Column({ nullable: false })
  created_by: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date

  @Column({ nullable: true })
  updated_by: string

  @Column({ type: 'timestamp with time zone', nullable: true })
  updated_at: Date
}
