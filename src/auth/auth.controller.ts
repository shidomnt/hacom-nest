import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserDocument } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req()
    req: Request & {
      user: Omit<UserDocument, 'password'>;
    },
  ) {
    return this.authService.login(req.user);
  }
}
