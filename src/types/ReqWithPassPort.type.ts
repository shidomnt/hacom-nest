import { Request } from 'express';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type ReqWithPassPort<Type = Request> = Type & {
  user: Omit<User, 'password'> & {
    _id: mongoose.Schema.Types.ObjectId;
  };
};
