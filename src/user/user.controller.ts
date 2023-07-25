import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import { UserIdDTO, UpdateUserDTO } from './dtos/user.dto';
import {
  UserIdValidatorPipe,
  UpdateUserValidatorPipe,
} from './validations/validation.pipe';
import { responseHandler } from '../utils/response.handler';
import { messageConstants } from '../constants/message.constants';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  async getUsers() {
    try {
      const users = await this.userService.getUsers();
      return responseHandler(200, messageConstants.SUCCESS, users);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Get('/:userId')
  async getUser(@Param(new UserIdValidatorPipe()) userIdDTO: UserIdDTO) {
    try {
      const user = await this.userService.getUser(userIdDTO);
      return responseHandler(200, messageConstants.SUCCESS, user);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Put('/:userId')
  async updateUser(
    @Param(new UserIdValidatorPipe()) userIdDTO: UserIdDTO,
    @Body(new UpdateUserValidatorPipe()) updateUserDTO: UpdateUserDTO,
  ) {
    try {
      await this.userService.updateUser(userIdDTO, updateUserDTO);
      return responseHandler(200, messageConstants.USER_UPDATED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Delete('/:userId')
  async deleteUser(@Param(new UserIdValidatorPipe()) userIdDTO: UserIdDTO) {
    try {
      await this.userService.deleteUser(userIdDTO);
      return responseHandler(200, messageConstants.USER_DELETED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
