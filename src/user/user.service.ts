import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './userDto';
import { hash } from '../utils/utils';
import { ConflictException } from '@nestjs/common';

export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUserById(id: number): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const userExist = await this.findUserByEmail(data.email);
    if (userExist) {
      throw new ConflictException('User with email exists');
    }
    return this.prisma.user.create({
      data: { ...data, password: await hash(data.password) },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
