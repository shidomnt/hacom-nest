import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ReqWithPassPort } from 'src/types/ReqWithPassPort.type';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req()
    req: ReqWithPassPort<Request>,
  ) {
    return this.authService.login(req.user);
  }
}
