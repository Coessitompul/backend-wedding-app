"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const config_1 = require("@nestjs/config");
exports.appConfig = (0, config_1.registerAs)('app', () => ({
    port: parseInt(process.env.PORT ?? '8000', 10),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    jwtSecret: process.env.JWT_SECRET ?? 'fallback-secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    databaseUrl: process.env.DATABASE_URL,
}));
//# sourceMappingURL=app.config.js.map