import {
  getCart,
  saveCart,
} from "./cartStorage";

export function updateQuantity(
  productId: string,
  quantity: number
) {
  const cart = getCart();

  const item = cart.find(
    (p) => p.product_id === productId
  );

  if (!item) return;

  if (quantity <= 0) {
    const updatedCart = cart.filter(
      (p) => p.product_id !== productId
    );

    saveCart(updatedCart);
  } else {
    item.quantity = quantity;

    saveCart(cart);
  }

  window.dispatchEvent(
    new Event("cartUpdated")
  );
}