import { PipeTransform, BadRequestException } from '@nestjs/common';

import { CreateBlogDTO, BlogIdDTO, UpdateBlogDTO } from '../dtos/blog.dto';

import {
  createBlogSchema,
  blogIdSchema,
  updateBlogSchema,
} from './blog.validations';

export class CreateBlogValidatorPipe implements PipeTransform<CreateBlogDTO> {
  public transform(value: CreateBlogDTO): CreateBlogDTO {
    const result = createBlogSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class BlogIdValidatorPipe implements PipeTransform<BlogIdDTO> {
  public transform(value: BlogIdDTO): BlogIdDTO {
    const result = blogIdSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}

export class UpdateBlogValidatorPipe implements PipeTransform<UpdateBlogDTO> {
  public transform(value: UpdateBlogDTO): UpdateBlogDTO {
    const result = updateBlogSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
