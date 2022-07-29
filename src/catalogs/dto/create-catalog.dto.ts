import { CatalogItem } from '../interfaces/catalogItem.interface';

export class CreateCatalogDto {
  category: string;

  content: Array<CatalogItem>;
}
