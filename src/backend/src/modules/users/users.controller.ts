import { Controller, Get, Post, Body, Param, Put, Query, ParseUUIDPipe, Req, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto, CreateUserDto } from '../../dtos';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  private async validateRequest(req: any) {
    // LEER EL ENCABEZADO AUTHORIZATION
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }
    const token = authHeader.split(' ')[1];
    
    const user = await this.authService.validateToken(token);
    req.user = user;
    return user;
  }

  @Post()
  create(@Body() userData: CreateUserDto): Promise<User> {
    return this.usersService.create(userData as any);
  }

  @Get()
  findAll(@Query('role') role?: string): Promise<User[]> {
    return this.usersService.findAll(role);
  }

  @Get('deletion-requests')
  async findDeletionRequests(@Req() req: any): Promise<User[]> {
    const user = await this.validateRequest(req);
    console.log('Recibida petición GET /users/deletion-requests');
    console.log('Usuario validado:', user);
    if (user.role !== 'coordinador') {
      console.log('Acceso denegado: rol no es coordinador');
      throw new ForbiddenException('Solo los coordinadores pueden ver las solicitudes de eliminación.');
    }
    return this.usersService.findDeletionRequests();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userData: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, userData as any);
  }

  @Post(':id/request-deletion')
  requestDeletion(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.requestDeletion(id);
  }
}
