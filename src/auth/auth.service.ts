import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiResponse } from '../common/types/api-response.type';
import { JwtPayload } from '../common/types/jwt-payload.type';
import { Users } from '@prisma/client';

export interface AuthData {
  user: Omit<Users, 'password'>;
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<ApiResponse<AuthData>> {
    const existing = await this.authRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email sudah terdaftar');
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

  async login(dto: LoginDto): Promise<ApiResponse<AuthData>> {
    const user = await this.authRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const token = this.signToken(user);
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Login berhasil',
      data: { user: userWithoutPassword, token },
    };
  }

  async getMe(user: Users): Promise<ApiResponse<Omit<Users, 'password'>>> {
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      message: 'OK',
      data: userWithoutPassword,
    };
  }

  logout(): ApiResponse<null> {
    return {
      success: true,
      message: 'Logout berhasil',
      data: null,
    };
  }

  private signToken(user: Users): string {
    const payload: JwtPayload = {
      sub: user.user_uuid,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
