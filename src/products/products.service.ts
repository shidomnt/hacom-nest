import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/categories/schemas/category.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProduct } from './interfaces/queryProduct.interface';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(query: Partial<QueryProduct>) {
    let products = this.productModel.find({});
    const { categorySlug, limit = 8, page, stockStatus, priceRange } = query;
    if (categorySlug) {
      const category = await this.categoryModel.findOne({ slug: categorySlug });
      products = products.where('category', category._id);
    }
    if (page) {
      products = products.skip(Math.max(page - 1, 0) * limit);
    }
    if (stockStatus) {
      products = products.where('stockStatus', stockStatus === 'con-hang');
    }
    if (priceRange) {
      const priceRangeSplit = priceRange.split('-');
      const min = priceRangeSplit[0];
      const max = priceRangeSplit[1];
      products = products.where('price').lte(Number(max)).gte(Number(min));
    }
    if (limit) {
      products = products.limit(limit);
    }
    return products;
  }

  findOne(id: string) {
    const product = this.productModel
      .findOne({
        id: id,
      })
      .populate('category');
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
