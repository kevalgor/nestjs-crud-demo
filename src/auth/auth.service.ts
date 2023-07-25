import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../user/schemas/user.schema';
import { LoginDTO, SignupDTO } from './dtos/auth.dto';
import { messageConstants } from '../constants/message.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDTO: SignupDTO): Promise<boolean> {
    const user = await this.userModel.findOne({ email: signupDTO.email });
    if (user) {
      throw new ConflictException(
        messageConstants.USER_ALREADY_EXIST,
        // {
        // cause: new Error(),
        // description: 'CONFLICT',
        // }
      );
    }
    await this.userModel.create(signupDTO);
    return true;
  }

  async login(loginDTO: LoginDTO): Promise<Record<string, string>> {
    const user = await this.userModel.findOne({ email: loginDTO.email });
    if (!user) {
      throw new UnauthorizedException(messageConstants.INVALID_CREDENTIALS);
    }
    const isPasswordMatch = user.comparePassword(loginDTO.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException(messageConstants.INVALID_CREDENTIALS);
    }
    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_EXPIRY_TIME,
    });
    const result = {
      ...payload,
      token,
    };
    return result;
  }
}
