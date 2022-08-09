import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { JwtPayLoad } from './interfaces/jwtPayLoad.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  async validateUser(email: User['email'], password: User['password']) {
    const user = await this.usersService.findOne(email);
    if (user && (await this.bcryptService.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: Omit<UserDocument, 'password'>) {
    const payload: JwtPayLoad = {
      email: user.email,
      sub: user._id,
    };
    const accessToken = this.jwtService.sign(payload);
    return {
      success: true,
      message: '',
      accessToken,
    };
  }
}
