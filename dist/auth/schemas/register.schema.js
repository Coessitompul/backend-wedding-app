"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Nama minimal 2 karakter').max(100),
    email: zod_1.z.string().email('Email tidak valid'),
    password: zod_1.z
        .string()
        .min(8, 'Password minimal 8 karakter')
        .regex(/[A-Z]/, 'Harus mengandung huruf besar')
        .regex(/[a-z]/, 'Harus mengandung huruf kecil')
        .regex(/[0-9]/, 'Harus mengandung angka')
        .regex(/[^A-Za-z0-9]/, 'Harus mengandung karakter spesial'),
});
//# sourceMappingURL=register.schema.js.map