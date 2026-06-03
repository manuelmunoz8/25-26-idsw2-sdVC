import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
        name: payload.name,
      };
    } catch (e) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  async login(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    
    const isPasswordMatching = user ? await bcrypt.compare(pass, user.password) : false;

    if (isPasswordMatching) {
      const payload = { email: user!.email, sub: user!.id, role: user!.role, name: user!.name };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user!.id,
          email: user!.email,
          role: user!.role,
          name: user!.name,
        }
      };
    }

    // Retornamos un error genérico sin discernir si es usuario o contraseña
    throw new UnauthorizedException({
      message: 'Credenciales inválidas',
      errorCode: 'AUTH_INVALID_CREDENTIALS'
    });
  }
}
