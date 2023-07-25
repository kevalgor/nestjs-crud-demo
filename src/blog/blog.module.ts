import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]), // Setup the mongoose module to use the blog schema
  ],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
