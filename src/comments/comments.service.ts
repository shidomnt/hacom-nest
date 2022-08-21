import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async handleReply(
    createCommentDto: Omit<CreateCommentDto, 'product'>,
    userId: mongoose.Schema.Types.ObjectId,
  ) {
    try {
      const { replyTo, ...rest } = createCommentDto;
      const createdComment = new this.commentModel({
        ...rest,
        author: userId,
      });
      const savedComment = await createdComment.save();
      const targetReplyComment = await this.commentModel.findById(replyTo);
      targetReplyComment.reply.push(savedComment._id);
      await targetReplyComment.save();
      return {
        success: true,
        message: '',
      };
    } catch (e) {
      if (e instanceof Error) {
        return {
          success: false,
          message: e.message,
        };
      }
    }
  }

  async create(
    createCommentDto: CreateCommentDto,
    userId: mongoose.Schema.Types.ObjectId,
  ) {
    const createdComment = new this.commentModel({
      ...createCommentDto,
      author: userId,
    });
    try {
      await createdComment.save();
      return {
        success: true,
        message: '',
        data: await this.commentModel.populate(createdComment, {
          path: 'author',
          select: '-password',
        }),
      };
    } catch (e) {
      if (e instanceof Error) {
        return {
          success: false,
          message: e.message,
        };
      }
    }
  }

  async findAll(productId: mongoose.Schema.Types.ObjectId) {
    const comments = await this.commentModel
      .find({ product: productId })
      .populate('author', '-password')
      .populate({
        path: 'reply',
        populate: {
          path: 'author',
          select: '-password',
        },
      });
    return {
      success: true,
      message: '',
      data: comments,
    };
  }

  findOne(id: mongoose.Schema.Types.ObjectId) {
    return `This action returns a #${id} comment`;
  }

  async update(
    id: mongoose.Schema.Types.ObjectId,
    updateCommentDto: UpdateCommentDto,
    userId: mongoose.Schema.Types.ObjectId,
  ) {
    try {
      const comment = await this.commentModel
        .findById(id)
        .where('author', userId);
      if (!comment) {
        throw new UnauthorizedException();
      }
      await comment.updateOne(updateCommentDto);
      return {
        success: true,
        message: '',
      };
    } catch (e) {
      if (e instanceof Error) {
        return {
          success: false,
          message: e.message,
        };
      }
    }
  }

  async remove(
    id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
  ) {
    try {
      const comment = await this.commentModel
        .findById(id)
        .where('author', userId);
      if (!comment) {
        throw new UnauthorizedException();
      }
      await comment.deleteOne();
      return {
        success: true,
        message: '',
      };
    } catch (e) {
      if (e instanceof Error) {
        return {
          success: false,
          message: e.message,
        };
      }
    }
  }
}
