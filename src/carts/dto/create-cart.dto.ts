import { CartItem } from '../schemas/cartItem.schema';

export class CreateCartDto {
  [index: number]: CartItem;
}
