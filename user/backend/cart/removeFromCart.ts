import {
  getCart,
  saveCart,
} from "./cartStorage";

export function removeFromCart(
  productId: string
) {
  const cart = getCart().filter(
    (item) =>
      item.product_id !== productId
  );

  saveCart(cart);

  window.dispatchEvent(
    new Event("cartUpdated")
  );
}