import { Controller, Post, Body, Get, UnauthorizedException, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service'; 
import { LoginDto } from '../../dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.login(loginDto.email, loginDto.password);
    // YA NO SETEAMOS LA COOKIE
    // res.cookie('token', ...);
    return { user: data.user, token: data.access_token }; // Enviamos el token al frontend
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Sesión cerrada con éxito' };
  }

  @Get('validate')
  async validate(@Req() req: Request) {
    const token = req.cookies['token'];
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }
    return this.authService.validateToken(token);
  }
}
