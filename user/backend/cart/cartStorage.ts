import { CartItem } from "./types";

const CART_KEY = "signature-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const cart =
    localStorage.getItem(CART_KEY);

  return cart
    ? JSON.parse(cart)
    : [];
}

export function saveCart(
  cart: CartItem[]
) {
  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );
}