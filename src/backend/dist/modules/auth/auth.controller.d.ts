import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: string;
            name: string;
        };
    }>;
    validate(authHeader: string): Promise<{
        id: any;
        email: any;
        role: any;
        name: any;
    }>;
}
