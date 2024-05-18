import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './taskDto';
import { TaskService } from './task.service';
import { AuthGuard } from '../auth/auth.guard';
import { PageOptionsDto } from '../utils/page-options.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post()
  @UseGuards(AuthGuard)
  async createTask(@Body() body: CreateTaskDto, @Request() req) {
    await this.taskService.createTask(body, req.user.userId);
    return {
      success: true,
      message: 'Task created successfully',
    };
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUserTasks(@Query() query: PageOptionsDto, @Request() req) {
    const tasks = await this.taskService.getUserTasks(query, req.user.userId);
    return {
      success: true,
      message: 'Tasks fetched successfully',
      data: tasks,
    };
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    const task = await this.taskService.getTaskById(id);
    return {
      success: true,
      message: 'Task fetched successfully',
      data: task,
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskDto,
  ) {
    const task = await this.taskService.updateTask(id, body);
    return {
      success: true,
      message: 'Task updated successfully successfully',
      data: task,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.deleteTask(id);
    return {
      success: true,
      message: 'Task fetched successfully',
    };
  }
}
