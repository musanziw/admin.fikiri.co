"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const session = require("express-session");
const passport = require("passport");
const process = require("process");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: Boolean(process.env.SESSION_RESAVE),
        saveUninitialized: Boolean(process.env.SESSION_SAVE_UNINITIALIZED),
        cookie: { maxAge: +process.env.SESSION_COOKIE_MAX_AGE },
    }));
    app.enableCors({
        origin: true,
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true,
    });
    app.use(passport.initialize());
    app.use(passport.session());
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(8000);
}
bootstrap().then(() => { });
//# sourceMappingURL=main.js.map