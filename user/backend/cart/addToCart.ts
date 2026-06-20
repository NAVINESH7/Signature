import { CartItem } from "./types";
import {
  getCart,
  saveCart,
} from "./cartStorage";

export function addToCart(
  item: CartItem
) {
  const cart = getCart();

  const existing =
    cart.find(
      (p) =>
        p.product_id === item.product_id
    );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(item);
  }

  saveCart(cart);

window.dispatchEvent(
  new Event("cartUpdated")
);
}