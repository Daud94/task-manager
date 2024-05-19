import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [TaskService, PrismaService, JwtService],
  controllers: [TaskController],
  exports: [TaskService],
})
export class TaskModule {}
