import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDTO, BlogIdDTO, UpdateBlogDTO } from './dtos/blog.dto';
import {
  CreateBlogValidatorPipe,
  BlogIdValidatorPipe,
  UpdateBlogValidatorPipe,
} from './validations/validation.pipe';
import { responseHandler } from '../utils/response.handler';
import { messageConstants } from '../constants/message.constants';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('/')
  async addBlog(
    @Body(new CreateBlogValidatorPipe()) createBlogDTO: CreateBlogDTO,
  ) {
    try {
      await this.blogService.addBlog(createBlogDTO);
      return responseHandler(200, messageConstants.BLOG_CREATED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Get('/')
  async getBlogs() {
    try {
      const blogs = await this.blogService.getBlogs();
      return responseHandler(200, messageConstants.SUCCESS, blogs);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Get('/:blogId')
  async getBlog(@Param(new BlogIdValidatorPipe()) blogIdDTO: BlogIdDTO) {
    try {
      const blog = await this.blogService.getBlog(blogIdDTO);
      return responseHandler(200, messageConstants.SUCCESS, blog);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Put('/:blogId')
  async updateBlog(
    @Param(new BlogIdValidatorPipe()) blogIdDTO: BlogIdDTO,
    @Body(new UpdateBlogValidatorPipe()) updateBlogDTO: UpdateBlogDTO,
  ) {
    try {
      await this.blogService.updateBlog(blogIdDTO, updateBlogDTO);
      return responseHandler(200, messageConstants.BLOG_UPDATED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }

  @Delete('/:blogId')
  async deleteBlog(@Param(new BlogIdValidatorPipe()) blogIdDTO: BlogIdDTO) {
    try {
      await this.blogService.deleteBlog(blogIdDTO);
      return responseHandler(200, messageConstants.BLOG_DELETED, true);
    } catch (err) {
      return responseHandler(err.status, err.message);
    }
  }
}
