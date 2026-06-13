import { Injectable, ConflictException, NotFoundException, OnModuleInit } from '@nestjs/common';
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
    const rawPassword = 'funiber%2Dconnected/2026';
    const existing = await this.findByEmail(adminEmail);

    if (!existing) {
      console.log('Sembrando usuario administrador por defecto...');
      const hashedPassword = await bcrypt.hash(rawPassword, 10);
      const admin = this.usersRepository.create({
        email: adminEmail,
        password: hashedPassword,
        name: 'Administrador Funiber',
        role: 'coordinador',
      });
      await this.usersRepository.save(admin);
      console.log('Usuario administrador creado con éxito.');
    } else {
      // Verificar si la contraseña actual coincide con la nueva (codificada)
      const isMatch = await bcrypt.compare(rawPassword, existing.password);
      if (!isMatch) {
        console.log('Actualizando contraseña de administrador por cambio en codificación frontend...');
        const newHashedPassword = await bcrypt.hash(rawPassword, 10);
        await this.usersRepository.update(existing.id, { password: newHashedPassword });
        console.log('Contraseña de administrador actualizada con éxito.');
      }
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ 
      where: { email }, 
      select: ['id', 'email', 'password', 'role', 'name', 'department'] 
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

  async findAll(role?: string): Promise<User[]> {
    const where = role ? { role } : {};
    return await this.usersRepository.find({ where });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    await this.usersRepository.update(id, userData);
    return this.findOne(id);
  }

  async requestDeletion(id: string): Promise<void> {
    console.log(`Solicitando eliminación para el usuario: ${id}`);
    const result = await this.usersRepository.update(id, { deletionRequested: true });
    console.log(`Resultado de la actualización:`, result);
  }

  async findDeletionRequests(): Promise<User[]> {
    console.log('Buscando solicitudes de eliminación...');
    const requests = await this.usersRepository.find({ where: { deletionRequested: true } });
    console.log(`Solicitudes encontradas: ${requests.length}`);
    return requests;
  }
}
