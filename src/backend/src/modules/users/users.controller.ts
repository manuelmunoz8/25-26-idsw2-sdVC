import { Controller, Get, Post, Body, Param, Put, Query, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from 'shared-dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: string): Promise<User[]> {
    return this.usersService.findAll(role);
  }

  @Get('deletion-requests')
  findDeletionRequests(): Promise<User[]> {
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
