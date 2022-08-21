import { DynamicModule, Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.service';

@Module({})
export class BcryptModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: BcryptModule,
      providers: [
        BcryptService,
        {
          provide: 'BCRYPT_OPTIONS',
          useValue: options,
        },
      ],
      exports: [BcryptService],
    };
  }
}
