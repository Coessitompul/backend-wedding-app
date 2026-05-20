"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Email tidak valid'),
    password: zod_1.z.string().min(8, 'Password minimal 8 karakter'),
});
//# sourceMappingURL=login.schema.js.map