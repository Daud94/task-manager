import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma.service';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [UserModule, AuthModule, TaskModule, GatewayModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
