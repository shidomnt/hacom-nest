import mongoose, { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from 'src/categories/schemas/category.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  id: string;

  @Prop()
  originalUrl: string;

  @Prop()
  imgSrc: string;

  @Prop()
  rate: number;

  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop()
  maxPrice: number;

  @Prop()
  price: number;

  @Prop()
  stockStatus: boolean;

  @Prop({ type: Object, required: true })
  tskt: Record<string, string>;

  @Prop()
  tssp: Array<string>;

  @Prop()
  uudai: Array<string>;

  @Prop()
  gallery: Array<string>;

  @Prop()
  baohanh: string;

  @Prop()
  vat: boolean;

  @Prop(
    raw({
      title: { type: [String] },
      info: { type: [String] },
      img: { type: [String] },
    }),
  )
  danhgia: Record<string, Array<string>>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
