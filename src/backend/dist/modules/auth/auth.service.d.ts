import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateToken(token: string): Promise<{
        id: any;
        email: any;
        role: any;
        name: any;
    }>;
    login(email: string, pass: string): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: string;
            name: string;
        };
    }>;
}
