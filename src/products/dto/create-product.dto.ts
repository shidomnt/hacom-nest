export class CreateProductDto {
  id: string;

  originalUrl: string;

  imgSrc: string;

  rate: number;

  name: string;

  maxPrice: number;

  price: number;

  discount: string;

  action: string;

  tskt: Record<string, string>;

  tssp: Array<string>;

  uudai: Array<string>;

  gallery: Array<string>;

  baohanh: string;

  vat: boolean;

  danhgia: Record<string, Array<string>>;
}
