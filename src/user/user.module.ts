import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UserService, PrismaService, JwtService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
