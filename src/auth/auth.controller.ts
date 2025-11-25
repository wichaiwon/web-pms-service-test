import { Controller, Post, Body, UseGuards, Request, Get, Patch, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { RegisterDto } from '../application/dto/users/register.dto'
import { LoginDto } from 'src/application/dto/users/login.dto'
import { ChangePasswordDto } from '../application/dto/users/change-password.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req) {
    const result = await this.authService.login(loginDto)
    return {
      success: true,
      message: 'Login successful',
      data: result,
    }
  }

  @ApiOperation({ summary: 'User registration (single or bulk)' })
  @ApiBody({ 
    type: RegisterDto,
    description: 'Single user or array of users',
    examples: {
      single: {
        summary: 'Single user registration',
        value: {
          pkg_id_member: '6805018',
          mirai_id: '405680518',
          email: 'wichai.wongfu.pkg@gmail.com',
          password: '1234567890',
          mirai_password: '1234567890',
          firstname: 'วิชัย',
          lastname: 'วงค์ฟู',
          pin_code: '123456',
          role: 'admin',
          branch: 'สำนักงานใหญ่'
        }
      },
      bulk: {
        summary: 'Bulk user registration',
        value: [
          {
            pkg_id_member: '6805018',
            mirai_id: '405680518',
            email: 'user1@example.com',
            password: '1234567890',
            mirai_password: '1234567890',
            firstname: 'User',
            lastname: 'One',
            role: 'admin',
            branch: 'สำนักงานใหญ่'
          },
          {
            pkg_id_member: '6805019',
            mirai_id: '405680519',
            email: 'user2@example.com',
            password: '1234567890',
            mirai_password: '1234567890',
            firstname: 'User',
            lastname: 'Two',
            role: 'user',
            branch: 'สาขา1'
          }
        ]
      }
    }
  })
  @ApiResponse({ status: 201, description: 'User(s) created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('register')
  async register(@Body() registerDto: RegisterDto | RegisterDto[]) {
    const result = await this.authService.register(registerDto)
    return {
      success: true,
      message: 'User(s) registered successfully',
      data: result,
    }
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      success: true,
      message: 'Profile retrieved successfully',
      data: req.user,
    }
  }

  @ApiOperation({ summary: 'Change user password' })
  @ApiBody({ type: ChangePasswordDto })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid current password or JWT token' })
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    const miraiId = req.user.mirai_id
    await this.authService.updatePassword(miraiId, changePasswordDto.oldPassword, changePasswordDto.newPassword)
    return {
      success: true,
      message: 'Password changed successfully',
    }
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiBearerAuth('Bearer')
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getUserById(@Param('id') id: string) {
    const result = await this.authService.getUserById(id)
    return {
      success: true,
      message: 'User retrieved successfully',
      data: result,
    }
  }
}
