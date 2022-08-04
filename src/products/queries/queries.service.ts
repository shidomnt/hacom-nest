import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from 'src/categories/schemas/category.schema';
import { QueryProduct } from '../interfaces/queryProduct.interface';

@Injectable()
export class QueriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async handleQuery<ResultType, DocType, THelpers, RawDocType>(
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
}
