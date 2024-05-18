import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './userDto';
import { hash } from '../utils/utils';

export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(id: number): Promise<User> {
    return this.prisma.user.findFirstOrThrow({
      where: { id },
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirstOrThrow({
      where: { email },
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
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
