import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'

export interface IPasswordHasher {
  hash(plainPassword: string): Promise<string>
  compare(plainPassword: string, hashedPassword: string): Promise<boolean>
}

@Injectable()
export class BcryptPasswordHasher implements IPasswordHasher {
  async hash(plainPassword: string): Promise<string> {
    return bcrypt.hash(plainPassword, 10)
  }

  async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
  }
}