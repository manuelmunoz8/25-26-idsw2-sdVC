import { Controller, Post, Body, Get, UnauthorizedException, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
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
      secure: true, // Asegurar que sea true en producción con HTTPS
      sameSite: 'strict',
      maxAge: 3600000, // 1 hora
    });

    return { user: data.user }; // Ya no devolvemos el token en el body
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
