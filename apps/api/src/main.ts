import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    origin: true,
    allowedHeaders: ['Content-Type', 'Set-Cookie', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials', 'Access-Control-Origin'],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app.listen(8000);
}




bootstrap().then(() => { });
