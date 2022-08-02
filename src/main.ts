import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://hacom-123.netlify.app/',
  });
  await app.listen(5000);
}
bootstrap();
