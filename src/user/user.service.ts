import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserIdDTO, UpdateUserDTO } from './dtos/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { messageConstants } from '../constants/message.constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel
      .find()
      .select('_id name email createdAt updatedAt');
    return users;
  }

  async getUser(userIdDTO: UserIdDTO): Promise<User> {
    const user = await this.userModel
      .findOne({ _id: userIdDTO.userId })
      .select('_id name email createdAt updatedAt');
    if (!user) {
      throw new NotFoundException(messageConstants.USER_NOT_EXIST);
    }
    return user;
  }

  async updateUser(
    userIdDTO: UserIdDTO,
    updateUserDTO: UpdateUserDTO,
  ): Promise<boolean> {
    const user = await this.userModel.findOne({ _id: userIdDTO.userId });
    if (!user) {
      throw new NotFoundException(messageConstants.USER_NOT_EXIST);
    }
    await this.userModel.updateOne({ _id: userIdDTO.userId }, updateUserDTO);
    return true;
  }

  async deleteUser(userIdDTO: UserIdDTO): Promise<boolean> {
    const user = await this.userModel.findOne({ _id: userIdDTO.userId });
    if (!user) {
      throw new NotFoundException(messageConstants.USER_NOT_EXIST);
    }
    await this.userModel.deleteOne({ _id: userIdDTO.userId });
    return true;
  }
}
