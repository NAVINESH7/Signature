import {
  getWishlist,
  saveWishlist,
  WishlistItem,
} from "./wishlistStorage";

export function addToWishlist(
  item: WishlistItem
) {
  const wishlist =
    getWishlist();

  const exists =
    wishlist.find(
      (p) =>
        p.product_id ===
        item.product_id
    );

  if (exists) {
    return;
  }

  wishlist.push(item);

  saveWishlist(wishlist);

  window.dispatchEvent(
    new Event("wishlistUpdated")
  );
}