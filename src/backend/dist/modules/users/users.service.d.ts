import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService implements OnModuleInit {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    onModuleInit(): Promise<void>;
    private seedAdminUser;
    findByEmail(email: string): Promise<User | null>;
    create(userData: Partial<User>): Promise<User>;
}
