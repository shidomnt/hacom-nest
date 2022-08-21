import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument } from './schemas/cart.shema';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async create(
    userId: mongoose.Schema.Types.ObjectId,
    createCartDto: CreateCartDto,
  ) {
    const createdCart = new this.cartModel({
      user: userId,
      content: createCartDto,
    });

    await createdCart.save();
    return {
      success: true,
      message: '',
    };
  }

  findOne(userId: mongoose.Schema.Types.ObjectId) {
    const cart = this.cartModel.findOne({ user: userId });
    return cart;
  }

  async update(
    userId: mongoose.Schema.Types.ObjectId,
    updateCartDto: UpdateCartDto,
  ) {
    await this.cartModel.findOneAndUpdate(
      { user: userId },
      {
        content: updateCartDto,
      },
    );
    return {
      success: true,
      message: '',
    };
  }
}
