import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProduct } from './interfaces/queryProduct.interface';
import { QueriesService } from './queries/queries.service';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private queriesService: QueriesService,
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

  async count(query: Partial<QueryProduct>) {
    const productCount = this.productModel.countDocuments();
    const result = await this.queriesService.handleQuery(productCount, query);
    return result;
  }

  async findAll(query: Partial<QueryProduct>) {
    const products = this.productModel.find({});
    const result = await this.queriesService.handleQuery(products, query);
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
