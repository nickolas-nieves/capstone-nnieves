import { Request } from 'express';
import { User } from './user/entities/user.entity';

export interface CustomRequest extends Request {
  user: User;
}
