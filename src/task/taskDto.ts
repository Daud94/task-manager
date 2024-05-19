import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TaskStatus } from './TaskStatus';

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Task name is required' })
  @Transform((params) => params.value.trim())
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required' })
  @Transform((params) => params.value.trim())
  description: string;

  @ApiProperty()
  @IsOptional()
  @Transform((params) => params.value.dueDate && new Date(params.value.duedate))
  dueDate?: Date;
}

export class UpdateTaskDto {
  @ApiProperty()
  @IsOptional()
  @Transform((params) => params.value.trim())
  name: string;

  @ApiProperty()
  @IsOptional()
  @Transform((params) => params.value.trim())
  description: string;

  @ApiProperty()
  @IsOptional()
  dueDate?: Date | null;

  @ApiProperty()
  @IsOptional()
  @Transform((params) => params.value.trim())
  @IsEnum(TaskStatus, { message: 'Not a valid task status' })
  status: string;

  @ApiProperty()
  @IsOptional()
  @Transform((params) => params.value.trim())
  dueDateSet: boolean;
}
