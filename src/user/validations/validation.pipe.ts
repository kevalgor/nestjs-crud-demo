import { PipeTransform, BadRequestException } from '@nestjs/common';

import { UserIdDTO, UpdateUserDTO } from '../dtos/user.dto';

import { userIdSchema, updateUserSchema } from './user.validations';

export class UserIdValidatorPipe implements PipeTransform<UserIdDTO> {
  public transform(value: UserIdDTO): UserIdDTO {
    const result = userIdSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class UpdateUserValidatorPipe implements PipeTransform<UpdateUserDTO> {
  public transform(value: UpdateUserDTO): UpdateUserDTO {
    const result = updateUserSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
