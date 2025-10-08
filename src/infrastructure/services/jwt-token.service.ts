import { Injectable } from '@nestjs/common'
import { JwtService as NestJwtService } from '@nestjs/jwt'

export interface IJwtTokenService {
  sign(payload: any): string
  verify(token: string): any
}

@Injectable()
export class JwtTokenService implements IJwtTokenService {
  constructor(private readonly jwtService: NestJwtService) {}

  sign(payload: any): string {
    return this.jwtService.sign(payload)
  }

  verify(token: string): any {
    return this.jwtService.verify(token)
  }
}