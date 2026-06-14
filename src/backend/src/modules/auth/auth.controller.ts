import { Controller, Post, Body, Get, UnauthorizedException, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service'; 
import { LoginDto } from '../../dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto.email, loginDto.password);
    return { user: data.user, token: data.access_token };
  }

  @Post('logout')
  logout() {
    return { message: 'Sesión cerrada con éxito' };
  }

  @Get('validate')
  async validate(@Req() req: Request) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.validateToken(token);
  }
}
