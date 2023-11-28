import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  });
  await app.listen(8000);
}

bootstrap().then(() => console.log(`🚀 Application is running on: localhost:8000`));