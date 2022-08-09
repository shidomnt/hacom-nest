import { UserDocument } from 'src/users/schemas/user.schema';

export interface JwtPayLoad {
  email: UserDocument['email'];
  sub: UserDocument['_id'];
}
