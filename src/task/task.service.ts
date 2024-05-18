import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './taskDto';
import { PageOptionsDto } from '../utils/page-options.dto';
import { TaskStatus } from './TaskStatus';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async getTaskById(id: number): Promise<Task> {
    return this.prisma.task.findFirstOrThrow({
      where: { id },
    });
  }

  async createTask(body: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        ...body,
        userId,
        status: TaskStatus.TODO,
        dueDateSet: body.dueDate && true,
      },
    });
  }
  async updateTask(id: number, body: Partial<Task>) {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: { ...body },
    });
  }

  async deleteTask(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async getUserTasks(query: PageOptionsDto, userId: number) {
    return this.prisma.task.findMany({
      where: {
        userId,
        ...(query.taskName && {
          name: {
            contains: query.taskName,
          },
        }),
        ...(query.description && {
          name: {
            contains: query.description,
          },
        }),
        ...(query.startDate &&
          query.endDate && {
            createdAt: {
              gte: query.startDate,
              lte: query.endDate,
            },
          }),
        ...(query.status && { status: query.status }),
      },
      skip: query.skip(),
      take: query.take,
      orderBy: {
        id: query.order,
      },
    });
  }
}
