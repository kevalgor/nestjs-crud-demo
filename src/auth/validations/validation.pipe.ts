import { PipeTransform, BadRequestException } from '@nestjs/common';

import { SignupDTO, LoginDTO } from '../dtos/auth.dto';

import { signupSchema, loginSchema } from './auth.validation';

export class SignupValidatorPipe implements PipeTransform<SignupDTO> {
  public transform(value: SignupDTO): SignupDTO {
    const result = signupSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class LoginValidatorPipe implements PipeTransform<LoginDTO> {
  public transform(value: LoginDTO): LoginDTO {
    const result = loginSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
