import { Module } from '@nestjs/common';
import { ShowroomsService } from './showrooms.service';
import { ShowroomsController } from './showrooms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Showroom, ShowroomSchema } from './schemas/showroom.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Showroom.name, schema: ShowroomSchema },
    ]),
  ],
  controllers: [ShowroomsController],
  providers: [ShowroomsService],
})
export class ShowroomsModule {}
