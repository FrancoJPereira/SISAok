import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Importar JwtService

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService, // Inyectar JwtService
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.usersService.findUserByUsername(username);

    // Verifica si el usuario existe
    if (user) {
      // Compara la contraseña proporcionada con la encriptada      
      if (await bcrypt.compare(password, user.password)) {
        const token = this.jwtService.sign({ username: user.username, sub: user.id }); // Genera el token JWT
        return {
          success: true,
          token,
          user: {
            id: user.id, // Agrega el id del usuario
            username: user.username, // Agrega el username del usuario
            // Aquí puedes agregar más propiedades del usuario que desees incluir en el token
          },
        }; // Retorna el token y los datos del usuario
      }
    }

    throw new UnauthorizedException('Credenciales inválidas');
  }
}
