import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReqWithPassPort } from 'src/types/ReqWithPassPort.type';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Req() req: ReqWithPassPort<Request>,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    if (!createCommentDto.replyTo) {
      return this.commentsService.create(createCommentDto, req.user._id);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { product, ...rest } = createCommentDto;
    return this.commentsService.handleReply(rest, req.user._id);
  }

  @Get(':productId')
  findAll(@Param('productId') productId: mongoose.Schema.Types.ObjectId) {
    return this.commentsService.findAll(productId);
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.commentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Req() req: ReqWithPassPort<Request>,
    @Param('id') id: mongoose.Schema.Types.ObjectId,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, updateCommentDto, req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Req() req: ReqWithPassPort<Request>,
    @Param('id') id: mongoose.Schema.Types.ObjectId,
  ) {
    return this.commentsService.remove(id, req.user._id);
  }
}
