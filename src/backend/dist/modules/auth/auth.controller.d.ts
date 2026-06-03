import { Response, Request } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any, res: Response): Promise<{
        user: {
            id: string;
            email: string;
            role: string;
            name: string;
        };
    }>;
    validate(req: Request): Promise<{
        id: any;
        email: any;
        role: any;
        name: any;
    }>;
}
