import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.usersService.findUserByUsername(username);

    // Verifica si el usuario existe
    if (user) {
      // Compara la contraseña proporcionada con la encriptada      
      if (await bcrypt.compare(password, user.password)) {
        // Aquí puedes generar un token JWT u otro tipo de token
        return { success: true, token: 'tu_token_aqui' }; // Genera el token aquí
      }
    }

    throw new UnauthorizedException('Credenciales inválidas');
  }
}
