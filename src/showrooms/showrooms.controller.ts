import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShowroomsService } from './showrooms.service';
import { CreateShowroomDto } from './dto/create-showroom.dto';
import { UpdateShowroomDto } from './dto/update-showroom.dto';
import mongoose from 'mongoose';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('showrooms')
export class ShowroomsController {
  constructor(private readonly showroomsService: ShowroomsService) {}

  @Post()
  @Roles('admin')
  create(@Body() createShowroomDto: CreateShowroomDto) {
    return this.showroomsService.create(createShowroomDto);
  }

  @Get()
  findAll() {
    return this.showroomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.showroomsService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() updateShowroomDto: UpdateShowroomDto,
  ) {
    return this.showroomsService.update(id, updateShowroomDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.showroomsService.remove(id);
  }
}
