import { Injectable } from '@nestjs/common';
import { User } from './user.entity'; // Asegúrate de que esto apunte a tu modelo de usuario
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto'; // Asegúrate de tener este DTO

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Asegúrate de que esto apunte a tu modelo de usuario
    private readonly userRepository: Repository<User>,
  ) {}

  // Método para encontrar un usuario por su nombre de usuario
  async findUserByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }

  // Método para crear un nuevo usuario
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, surname, username, password, email } = createUserDto;   
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing de la contraseña
    
    // Crea un nuevo usuario incluyendo todos los campos requeridos
    const newUser = this.userRepository.create({ 
      name,
      surname,
      username, 
      email, 
      password: hashedPassword 
    });
    
    return await this.userRepository.save(newUser);
  }

  // Método para validar el usuario (opcional)
  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.findUserByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return true;
    }
    return false;
  }
}
