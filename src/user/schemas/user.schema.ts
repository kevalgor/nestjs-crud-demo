import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  password: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;

  // For comparing passwords
  comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);
