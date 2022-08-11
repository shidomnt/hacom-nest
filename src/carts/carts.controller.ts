import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReqWithPassPort } from 'src/types/ReqWithPassPort.type';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@UseGuards(JwtAuthGuard)
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  async findOne(@Req() req: ReqWithPassPort<Request>) {
    const cart = await this.cartsService.findOne(req.user._id).populate({
      path: 'content',
      populate: {
        path: 'product',
      },
    });
    return {
      success: true,
      message: '',
      data: cart?.content ?? [],
    };
  }

  @Post()
  async create(
    @Req() req: ReqWithPassPort<Request>,
    @Body() body: CreateCartDto,
  ) {
    const cart = await this.cartsService.findOne(req.user._id);
    if (cart) {
      return this.update(req, body);
    }
    return this.cartsService.create(req.user._id, body);
  }

  @Patch('update')
  update(
    @Req() req: ReqWithPassPort<Request>,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartsService.update(req.user._id, updateCartDto);
  }
}
