import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShowroomDocument = Showroom & Document;

@Schema({ timestamps: true })
export class Showroom {
  @Prop()
  name: string;

  @Prop()
  diachi: string;

  @Prop()
  googleMapUrl: string;

  @Prop()
  phone: string;

  @Prop()
  landline: string;

  @Prop()
  baohanh: string;

  @Prop()
  email: string;

  @Prop()
  openTime: string;

  @Prop()
  city: string;

  @Prop()
  moikhaitruong: boolean;
}

export const ShowroomSchema = SchemaFactory.createForClass(Showroom);
