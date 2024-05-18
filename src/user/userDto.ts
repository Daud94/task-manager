import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'First name is required' })
  @Transform((params) => params.value.trim())
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Last name is required' })
  @Transform((params) => params.value.trim())
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Last name is required' })
  @Transform((params) => params.value.trim())
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @Transform((params) => params.value.trim())
  password: string;
}

export class UpdateUserDto extends PickType(CreateUserDto, [
  'firstName',
  'lastName',
] as const) {}

export class SignInDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}
