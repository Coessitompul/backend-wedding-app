import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Users } from '@prisma/client';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<import("../common/types/api-response.type").ApiResponse<import("./auth.service").AuthData>>;
    login(dto: LoginDto): Promise<import("../common/types/api-response.type").ApiResponse<import("./auth.service").AuthData>>;
    logout(): import("../common/types/api-response.type").ApiResponse<null>;
    getMe(user: Users): Promise<import("../common/types/api-response.type").ApiResponse<Omit<Users, "password">>>;
}
