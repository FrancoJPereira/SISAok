import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED) // Devuelve 201 cuando se crea el usuario
  async createUser(@Body() createUserDto: CreateUserDto) {
    // Agregamos el console.log para ver qué se está enviando
    

    const user = await this.usersService.create(createUserDto);
    return {
      message: 'Usuario creado exitosamente',
      user,
    };
  }
}
