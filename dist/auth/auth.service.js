"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const auth_repository_1 = require("./auth.repository");
let AuthService = class AuthService {
    constructor(authRepository, jwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existing = await this.authRepository.findByEmail(dto.email);
        if (existing) {
            throw new common_1.ConflictException('Email sudah terdaftar');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.authRepository.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
        });
        const token = this.signToken(user);
        const { password: _, ...userWithoutPassword } = user;
        return {
            success: true,
            message: 'Registrasi berhasil',
            data: { user: userWithoutPassword, token },
        };
    }
    async login(dto) {
        const user = await this.authRepository.findByEmail(dto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Email atau password salah');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Email atau password salah');
        }
        const token = this.signToken(user);
        const { password: _, ...userWithoutPassword } = user;
        return {
            success: true,
            message: 'Login berhasil',
            data: { user: userWithoutPassword, token },
        };
    }
    async getMe(user) {
        const { password: _, ...userWithoutPassword } = user;
        return {
            success: true,
            message: 'OK',
            data: userWithoutPassword,
        };
    }
    logout() {
        return {
            success: true,
            message: 'Logout berhasil',
            data: null,
        };
    }
    signToken(user) {
        const payload = {
            sub: user.user_uuid,
            email: user.email,
            role: user.role,
        };
        return this.jwtService.sign(payload);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map