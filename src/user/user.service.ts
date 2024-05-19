import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './userDto';
import { hash } from '../utils/utils';
import { ConflictException, Inject, NotFoundException } from '@nestjs/common';

export class UserService {
  constructor(@Inject(PrismaService) private prisma: PrismaService) {}

  async findUserById(id: number): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        email,
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

  async updateUser(userId: number, body: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: { ...body },
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
