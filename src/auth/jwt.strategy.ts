import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { JwtPayLoad } from './interfaces/jwtPayLoad.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_TOKEN,
    });
  }

  async validate(payload: JwtPayLoad) {
    const user = await this.usersService.findOne(payload.email);
    const { password: _, ...result } = user.toObject();
    return result;
  }
}
