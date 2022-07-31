import { Category } from 'src/categories/schemas/category.schema';
import { Product } from '../schemas/product.schema';

export interface QueryProduct {
  categorySlug: Category['slug'];
  limit: number;
  page: number;
  stockStatus: string;
  priceRange: string;
  name: Product['name'];
}
