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

    // Setear la cookie HttpOnly
    res.cookie('token', data.access_token, {
      httpOnly: true,
      secure: false, // Asegurar que sea true en producción con HTTPS
      sameSite: 'lax',
      maxAge: 3600000, // 1 hora
    });

    return { user: data.user }; // Ya no devolvemos el token en el body
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
