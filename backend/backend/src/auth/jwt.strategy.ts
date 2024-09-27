
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service'; // Asegúrate de que la ruta sea correcta

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'bJgUV1TevbCs', // Debe ser el mismo que utilizaste en JwtModule
    });
  }

  async validate(payload: any) {
    return await this.usersService.findUserByUsername(payload.username); // Busca por username
}
};
