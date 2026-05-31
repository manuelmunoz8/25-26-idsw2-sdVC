import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    // Para el prototipo, validación de contraseña simple (sin hash aún por velocidad)
    if (user && user.password === pass) {
      const payload = { email: user.email, sub: user.id, role: user.role, name: user.name };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        }
      };
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }
}
