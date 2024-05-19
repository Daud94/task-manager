import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from '../task/taskDto';
import { TaskService } from '../task/task.service';

@WebSocketGateway()
export class GatewayService implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly taskService: TaskService) {}

  onModuleInit(): any {
    this.server.on('connection', (socket) => {
      console.log('connected');
    });
  }

  @SubscribeMessage('createTask')
  async onNewMessage(
    @MessageBody() body: { userId: number; reqBody: CreateTaskDto },
  ) {
    const { userId, reqBody } = body;
    const task = await this.taskService.createTask(reqBody, userId);
    this.server.emit('onTaskCreate', task);
  }
}
