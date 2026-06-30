import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  
  @Post()
  @ApiOperation({
    summary: 'Create a new user',
  })
  @ApiCreatedResponse({
    description: 'User created successfully',
  })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }
}