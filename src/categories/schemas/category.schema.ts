import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
