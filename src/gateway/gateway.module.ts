import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TaskModule],
  providers: [GatewayService],
})
export class GatewayModule {}
