import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private bcryptService: BcryptService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.bcryptService.hash(
      createUserDto.password,
    );
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    try {
      await createdUser.save();
      return {
        success: true,
      };
    } catch (e) {
      return {
        success: false,
      };
    }
  }

  findOne(email: User['email']) {
    const user = this.userModel.findOne({ email: email });
    return user;
  }
}
