import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShowroomsService } from './showrooms.service';
import { CreateShowroomDto } from './dto/create-showroom.dto';
import { UpdateShowroomDto } from './dto/update-showroom.dto';

@Controller('showrooms')
export class ShowroomsController {
  constructor(private readonly showroomsService: ShowroomsService) {}

  @Post()
  create(@Body() createShowroomDto: CreateShowroomDto) {
    return this.showroomsService.create(createShowroomDto);
  }

  @Get()
  findAll() {
    return this.showroomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showroomsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShowroomDto: UpdateShowroomDto) {
    return this.showroomsService.update(+id, updateShowroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showroomsService.remove(+id);
  }
}
