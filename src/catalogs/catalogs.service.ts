import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';
import { Catalog, CatalogDocument } from './schemas/catalog.schema';

@Injectable()
export class CatalogsService {
  constructor(
    @InjectModel(Catalog.name) private catalogModel: Model<CatalogDocument>,
  ) {}

  create(createCatalogDto: CreateCatalogDto) {
    const createdCatalog = new this.catalogModel(createCatalogDto);
    return createdCatalog.save();
  }

  findAll() {
    const catalogs = this.catalogModel.find({}).populate('category');
    return catalogs;
  }

  findOne(id: mongoose.Schema.Types.ObjectId) {
    const catalog = this.catalogModel.findById(id).populate('category');
    return catalog;
  }

  update(id: number, updateCatalogDto: UpdateCatalogDto) {
    return `This action updates a #${id} catalog`;
  }

  remove(id: number) {
    return `This action removes a #${id} catalog`;
  }
}
