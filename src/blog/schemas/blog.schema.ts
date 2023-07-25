import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema({ timestamps: true, collection: 'blogs' })
export class Blog {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  author: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  category: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
