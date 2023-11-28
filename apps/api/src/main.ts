import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: Boolean(process.env.SESSION_RESAVE),
      saveUninitialized: false,
      cookie: { maxAge: +process.env.SESSION_COOKIE_MAX_AGE },
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
