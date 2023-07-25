import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogDTO, BlogIdDTO, UpdateBlogDTO } from './dtos/blog.dto';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { messageConstants } from '../constants/message.constants';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('Blog') private readonly blogModel: Model<BlogDocument>,
  ) {}

  async addBlog(createBlogDTO: CreateBlogDTO): Promise<boolean> {
    await this.blogModel.create(createBlogDTO);
    return true;
  }

  async getBlogs(): Promise<Blog[]> {
    const blogs = await this.blogModel.find();
    return blogs;
  }

  async getBlog(blogIdDTO: BlogIdDTO): Promise<Blog> {
    const blog = await this.blogModel.findOne({ _id: blogIdDTO.blogId });
    if (!blog) {
      throw new NotFoundException(
        messageConstants.BLOG_NOT_EXIST,
        // {
        // cause: new Error(),
        // description: 'NOT_FOUND',
        // }
      );
    }
    return blog;
  }

  async updateBlog(
    blogIdDTO: BlogIdDTO,
    updateBlogDTO: UpdateBlogDTO,
  ): Promise<boolean> {
    const blog = await this.blogModel.findOne({ _id: blogIdDTO.blogId });
    if (!blog) {
      throw new NotFoundException(messageConstants.BLOG_DELETED);
    }
    await this.blogModel.updateOne({ _id: blogIdDTO.blogId }, updateBlogDTO);
    return true;
  }

  async deleteBlog(blogIdDTO: BlogIdDTO): Promise<boolean> {
    const blog = await this.blogModel.findOne({ _id: blogIdDTO.blogId });
    if (!blog) {
      throw new NotFoundException(messageConstants.BLOG_NOT_EXIST);
    }
    await this.blogModel.deleteOne({ _id: blogIdDTO.blogId });
    return true;
  }
}
