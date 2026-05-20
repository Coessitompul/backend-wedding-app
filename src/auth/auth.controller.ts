import { Controller, Post, Get, Body, UsePipes, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { loginSchema } from './schemas/login.schema';
import { registerSchema } from './schemas/register.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Users } from '@prisma/client';

@Controller('auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @UsePipes(new ZodValidationPipe(registerSchema))
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @Public()
  @UsePipes(new ZodValidationPipe(loginSchema))
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @Get('me')
  getMe(@CurrentUser() user: Users) {
    return this.authService.getMe(user);
  }
}
