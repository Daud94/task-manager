import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { TaskStatus } from '../task/TaskStatus';

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

export class PageOptionsDto {
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.DESC;

  @IsOptional()
  taskName?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  startDate?: string;

  @IsOptional()
  @Transform((params) => params.value.endDate && new Date(params.value.endDate))
  endDate?: Date;

  @IsOptional()
  // @IsEnum(TaskStatus, { message: 'Invalid status' })
  // @Transform((params) => (params.value ? params.value : TaskStatus.TODO))
  status?: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Transform((params) => (params.value ? parseInt(params.value) : 1))
  @IsOptional()
  readonly page?: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  @IsOptional()
  @Transform((params) => (params.value ? parseInt(params.value) : 20))
  readonly take?: number;

  get skip() {
    return (this.page - 1) * this.take;
  }
}
