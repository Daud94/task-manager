import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { verifyHash } from '../utils/utils';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, SignInDto } from '../user/userDto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(body: CreateUserDto): Promise<User> {
    const userExist = await this.userService.findUserByEmail(body.email);
    if (userExist) {
      throw new ConflictException('User with the email exists');
    }
    return await this.userService.createUser(body);
  }

  async signIn(body: SignInDto): Promise<string> {
    const user = await this.userService.findUserByEmail(body.email);
    if (!user) {
      throw new BadRequestException('Invalid email address');
    }
    const isValid = await verifyHash(body.password, user.password);
    if (!isValid) {
      throw new BadRequestException('Invalid login credential');
    }

    const token = await this.jwtService.signAsync(
      { userId: user.id },
      { secret: process.env['JWT_SECRET'], expiresIn: 86400 },
    );

    return token;
  }
}
