export interface CatalogItem {
  title: string;
  children: Array<CatalogItem | string>;
}
