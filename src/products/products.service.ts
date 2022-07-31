import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
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

  textSearch(searchString: string) {
    const products = this.productModel
      .find({
        $text: { $search: searchString },
      })
      .limit(6);
    return products;
  }

  private async handleQuery<ResultType, DocType, THelpers, RawDocType>(
    products: Query<ResultType, DocType, THelpers, RawDocType>,
    query: Partial<QueryProduct>,
  ): Promise<Query<ResultType, DocType, THelpers, RawDocType>> {
    const { categorySlug, name, limit, page, stockStatus, priceRange } = query;
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
    if (name) {
      const namePattern = new RegExp(name, 'gi');
      products = products.where('name', namePattern);
    }
    return products;
  }

  async count(query: Partial<QueryProduct>) {
    const productCount = this.productModel.countDocuments();
    const result = await this.handleQuery(productCount, query);
    return result;
  }

  async findAll(query: Partial<QueryProduct>) {
    const products = this.productModel.find({});
    const result = await this.handleQuery(products, query);
    return result;
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
