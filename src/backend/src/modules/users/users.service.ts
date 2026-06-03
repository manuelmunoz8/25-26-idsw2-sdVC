import { Injectable, ConflictException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.seedAdminUser();
  }

  private async seedAdminUser() {
    const adminEmail = 'admin@funiber.org';
    const existing = await this.findByEmail(adminEmail);
    
    if (!existing) {
      console.log('Sembrando usuario administrador por defecto...');
      const hashedPassword = await bcrypt.hash('funiber-connected/2026', 10);
      const admin = this.usersRepository.create({
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrador Funiber',
        role: 'coordinador',
      });
      await this.usersRepository.save(admin);
      console.log('Usuario administrador creado con éxito.');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ 
      where: { email }, 
      select: ['id', 'email', 'password', 'role', 'name'] 
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const existing = await this.findByEmail(userData.email!);
    if (existing) throw new ConflictException('User already exists');
    
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    
    const user = this.usersRepository.create(userData);
    return await this.usersRepository.save(user);
  }
}
