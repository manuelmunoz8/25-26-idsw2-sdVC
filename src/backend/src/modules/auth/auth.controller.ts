import { Controller, Post, Body, Get, UnauthorizedException, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service'; 
import { LoginDto } from '../../dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.login(loginDto.email, loginDto.password);
    
    res.cookie('token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    });

    return { user: data.user };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Sesión cerrada con éxito' };
  }

  @Get('validate')
  async validate(@Req() req: Request) {
    const token = req.cookies?.token;
    
    if (!token) {
      throw new UnauthorizedException('Sesión no encontrada');
    }
    
    return this.authService.validateToken(token);
  }
}
