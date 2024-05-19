import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, SignInDto } from '../user/userDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body);
    delete user['password'];
    return {
      success: true,
      message: 'User signup successful',
      data: user,
    };
  }

  @Post('signin')
  async signIn(
    @Body() body: SignInDto,
  ): Promise<{ success: boolean; message: string; accessToken: string }> {
    const data = await this.authService.signIn(body);
    return {
      success: true,
      message: 'Signin successful!',
      ...data,
    };
  }
}
