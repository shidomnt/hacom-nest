import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateShowroomDto } from './dto/create-showroom.dto';
import { UpdateShowroomDto } from './dto/update-showroom.dto';
import { Showroom, ShowroomDocument } from './schemas/showroom.schema';

@Injectable()
export class ShowroomsService {
  constructor(
    @InjectModel(Showroom.name) private showroomModel: Model<ShowroomDocument>,
  ) {}
  create(createShowroomDto: CreateShowroomDto) {
    const createdShowroom = new this.showroomModel(createShowroomDto);
    return createdShowroom.save();
  }

  findAll() {
    const showrooms = this.showroomModel.find({});
    return showrooms;
  }

  findOne(id: mongoose.Schema.Types.ObjectId) {
    const showroom = this.showroomModel.findById(id);
    return showroom;
  }

  update(
    id: mongoose.Schema.Types.ObjectId,
    updateShowroomDto: UpdateShowroomDto,
  ) {
    const oldShowroom = this.showroomModel.findByIdAndUpdate(
      id,
      updateShowroomDto,
    );
    return oldShowroom;
  }

  remove(id: mongoose.Schema.Types.ObjectId) {
    const deletedShowroom = this.showroomModel.findByIdAndDelete(id);
    return deletedShowroom;
  }
}
