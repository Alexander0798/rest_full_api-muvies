import { Request } from 'express';
import { User } from 'src/user/user.schema';

export interface ExpressRequestInterface extends Request {
  user?: User;
}
