import { Users } from 'src/domain/entities/user/user.entity'

export interface IUserRepository {
  findByMiraiId(mirai_id: string): Promise<Users | null>
  findById(id: string): Promise<Users | null>
  create(userData: Partial<Users>): Promise<Users>
  save(user: Users): Promise<Users>
  findAll(): Promise<Users[]>
  update(id: string, userData: Partial<Users>): Promise<Users>
}
