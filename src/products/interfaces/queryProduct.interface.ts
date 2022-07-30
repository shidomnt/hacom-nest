import { Category } from 'src/categories/schemas/category.schema';
import { Product } from '../schemas/product.schema';

export interface QueryProduct extends Product {
  categorySlug: Category['slug'];
  limit: number;
  page: number;
}
