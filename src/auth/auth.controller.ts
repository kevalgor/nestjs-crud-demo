import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO, LoginDTO } from './dtos/auth.dto';
import {
  SignupValidatorPipe,
  LoginValidatorPipe,
} from './validations/validation.pipe';
import { responseHandler } from '../utils/response.handler';
import { messageConstants } from '../constants/message.constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body(new SignupValidatorPipe()) signupDTO: SignupDTO) {
    try {
      await this.authService.signup(signupDTO);
      return responseHandler(200, messageConstants.SIGNUP_SUCCESS, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Post('/login')
  async login(@Body(new LoginValidatorPipe()) loginDTO: LoginDTO) {
    try {
      const login = await this.authService.login(loginDTO);
      return responseHandler(200, messageConstants.LOGIN_SUCCESS, login);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
