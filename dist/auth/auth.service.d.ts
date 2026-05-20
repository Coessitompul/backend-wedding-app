import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ApiResponse } from '../common/types/api-response.type';
import { Users } from '@prisma/client';
export interface AuthData {
    user: Omit<Users, 'password'>;
    token: string;
}
export declare class AuthService {
    private readonly authRepository;
    private readonly jwtService;
    constructor(authRepository: AuthRepository, jwtService: JwtService);
    register(dto: RegisterDto): Promise<ApiResponse<AuthData>>;
    login(dto: LoginDto): Promise<ApiResponse<AuthData>>;
    getMe(user: Users): Promise<ApiResponse<Omit<Users, 'password'>>>;
    logout(): ApiResponse<null>;
    private signToken;
}
