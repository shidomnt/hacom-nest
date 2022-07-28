import mongoose, { Document } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from 'src/categories/schemas/category.schema';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  id: string;

  @Prop()
  originalUrl: string;

  @Prop({ required: true })
  imgSrc: string;

  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop({ required: true })
  maxPrice: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  discount: string;

  @Prop({ required: true })
  action: string;

  @Prop({ type: Object, required: true })
  tskt: Record<string, string>;

  @Prop({ required: true })
  tssp: Array<string>;

  @Prop({ required: true })
  uudai: Array<string>;

  @Prop({ required: true })
  gallery: Array<string>;

  @Prop({ required: true })
  baohanh: string;

  @Prop({ required: true })
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
