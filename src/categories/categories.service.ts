import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryDocument } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  findAll(query: Category) {
    let categories = this.categoryModel.find({});
    const { slug } = query;
    if (slug) {
      categories = categories.where('slug', slug);
    }
    return categories;
  }

  findOne(id: mongoose.Schema.Types.ObjectId) {
    const category = this.categoryModel.findById(id);
    return category;
  }

  update(
    id: mongoose.Schema.Types.ObjectId,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const oldCategory = this.categoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
    );
    return oldCategory;
  }

  remove(id: mongoose.Schema.Types.ObjectId) {
    const deletedCategory = this.categoryModel.findByIdAndDelete(id);
    return deletedCategory;
  }
}
