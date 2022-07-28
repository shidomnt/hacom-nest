import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  create(
    createProductDto: CreateProductDto,
    category: mongoose.Schema.Types.ObjectId,
  ) {
    const createdProduct = new this.productModel({
      ...createProductDto,
      category,
    });
    return createdProduct.save();
  }

  findAll() {
    const products = this.productModel.find({});
    return products;
  }

  findOne(id: string) {
    const product = this.productModel.findOne({ id: id });
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const oldProduct = this.productModel.findOneAndUpdate(
      { id: id },
      updateProductDto,
    );
    return oldProduct;
  }

  remove(id: string) {
    const deletedProduct = this.productModel.findOneAndDelete({ id: id });
    return deletedProduct;
  }
}
