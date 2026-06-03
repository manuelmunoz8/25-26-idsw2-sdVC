import { Controller, Post, Body, Get, Headers, UnauthorizedException, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any, @Res({ passthrough: true }) res: Response) {
    const data = await this.authService.login(body.email, body.password);

    // Setear la cookie HttpOnly
    res.cookie('token', data.access_token, {
      httpOnly: true,
      secure: true, // Necesario en producción (HTTPS)
      sameSite: 'strict', // O 'none' si el frontend está en otro dominio
      maxAge: 3600000, // 1 hora
    });

    return { user: data.user }; // Ya no devolvemos el token en el body
  }

  @Get('validate')
  async validate(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.validateToken(token);
  }
}
