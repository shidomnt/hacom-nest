import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class BcryptService {
  constructor(@Inject('BCRYPT_OPTIONS') private options: Record<string, any>) {}

  async hash(plainTextPassword: User['password']) {
    const hashedPassword = await bcrypt.hash(
      plainTextPassword,
      this.options?.saltRounds ?? 10,
    );
    return hashedPassword;
  }

  async compare(plainTextPassword: User['password'], hashedPassword: string) {
    const result = await bcrypt.compare(plainTextPassword, hashedPassword);
    return result;
  }
}
