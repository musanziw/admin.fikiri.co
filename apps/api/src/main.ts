import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as process from 'process';
import { tr } from '@faker-js/faker';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: Boolean(process.env.SESSION_RESAVE),
      saveUninitialized: Boolean(process.env.SESSION_SAVE_UNINITIALIZED),
      cookie: { maxAge: +process.env.SESSION_COOKIE_MAX_AGE },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(helmet());
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://fikiri.co',
      'https://www.fikiri.co',
    ],
    allowedHeaders: 'Content-Type, Authorization',
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  await app.listen(8000);
}




bootstrap().then(() => { });
