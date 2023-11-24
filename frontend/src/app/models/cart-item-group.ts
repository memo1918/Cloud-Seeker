import { CartItem } from "./cart-item";

export interface CartItemGroup {
  category: string;
  items: CartItem[];
}
