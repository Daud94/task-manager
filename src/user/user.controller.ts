import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './userDto';
import { AuthGuard } from '../auth/auth.guard';
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Put(':id')
  @UseGuards(AuthGuard)
  async updateProfile(
    @Body() body: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.userService.updateUser(id, body);
    return {
      success: true,
      message: 'Profile updated!',
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteAccount(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
    return {
      success: true,
      message: 'Account deleted',
    };
  }
}
