import { Category } from 'src/categories/schemas/category.schema';

export interface QueryProduct {
  categorySlug: Category['slug'];
  limit: number;
  page: number;
  stockStatus: string;
  priceRange: string;
}
