import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/categories/schemas/category.schema';
import { CatalogItem } from '../interfaces/catalogItem.interface';

export type CatalogDocument = Catalog & Document;

@Schema({ timestamps: true })
export class Catalog {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop()
  content: Array<CatalogItem>;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
