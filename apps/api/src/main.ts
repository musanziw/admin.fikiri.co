import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as process from 'process';

async function bootstrap() {
<<<<<<< HEAD
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
    app.enableCors({
        origin: true,
        allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials', 'Access-Control-Allow-Headers'],
        credentials: true,
    });
    await app.listen(8000);
=======
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
  app.enableCors({
    origin: true,
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'Set-Cookie'],
    credentials: true,
  });
  await app.listen(8000);
>>>>>>> 4be3bad (update: fix feedback)
}




bootstrap().then(() => {});
