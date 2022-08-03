import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RoleGuard } from './guards/role.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.ORIGIN || 'https://hacom-123.netlify.app',
  });
  app.useGlobalGuards(new RoleGuard(new Reflector(), new ConfigService()));
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
