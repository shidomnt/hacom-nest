import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, default: 'Anonymous', maxlength: 30 })
  name: string;

  @Prop()
  avatarSrc?: string;

  @Prop()
  nameTag?: string;

  @Prop()
  phone?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  gender?: boolean;

  @Prop()
  city?: string;

  @Prop()
  address?: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
