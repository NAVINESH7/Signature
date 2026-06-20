export interface WishlistItem {
  product_id: string;
  name: string;
  image: string;
  price: number;
}

const STORAGE_KEY =
  "signature-wishlist";

export function getWishlist(): WishlistItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const data =
    localStorage.getItem(STORAGE_KEY);

  return data
    ? JSON.parse(data)
    : [];
}

export function saveWishlist(
  items: WishlistItem[]
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items)
  );
}