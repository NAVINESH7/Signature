"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "@/user/frontend/components/Navbar";
import { supabaseClient } from "@/lib/supabase-client";

interface WishlistItem {
  id: string;
  product_id: string;
  name: string;
  cover_image: string;
  price: number;
}

export default function WishlistPage() {
  const [wishlist, setWishlist] =
    useState<WishlistItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  async function loadWishlist() {
    try {
      const {
        data: { user },
      } =
        await supabaseClient.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const {
        data: wishlistRows,
        error: wishlistError,
      } = await supabaseClient
        .from("wishlist_items")
        .select("id, product_id")
        .eq("user_id", user.id);

      if (wishlistError) {
        console.error(wishlistError);
        setLoading(false);
        return;
      }

      if (
        !wishlistRows ||
        wishlistRows.length === 0
      ) {
        setWishlist([]);
        setLoading(false);
        return;
      }

      const productIds =
        wishlistRows.map(
          (item) => item.product_id
        );

      const {
        data: products,
        error: productError,
      } = await supabaseClient
        .from("products")
        .select(
            "id,name,price,cover_image"
    )
        .in("id", productIds);

      if (productError) {
        console.error(productError);
        setLoading(false);
        return;
      }

      const formatted =
        products.map((product) => ({
          id:
            wishlistRows.find(
              (w) =>
                w.product_id ===
                product.id
            )?.id || "",

          product_id: product.id,
          name: product.name,
          cover_image:
            product.cover_image,
          price: Number(
            product.price
          ),
        }));

      setWishlist(formatted);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(
    wishlistId: string
  ) {
    const { error } =
      await supabaseClient
        .from("wishlist_items")
        .delete()
        .eq("id", wishlistId);

    if (error) {
      alert(error.message);
      return;
    }

    setWishlist((prev) =>
      prev.filter(
        (item) =>
          item.id !== wishlistId
      )
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <Navbar />

      <section className="py-12">
        <div className="luxury-container">
          <div className="mb-12">
            <h1 className="font-luxury text-6xl">
              My Wishlist
            </h1>

            <p className="mt-3 text-gray-500">
              Save your favorite
              sarees
            </p>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : wishlist.length ===
            0 ? (
            <div
              className="
                bg-white
                border
                border-[#E7E0D4]
                rounded-[24px]
                p-16
                text-center
              "
            >
              <h2 className="font-luxury text-4xl">
                Wishlist Empty
              </h2>

              <p className="mt-4 text-gray-500">
                Add products to your
                wishlist.
              </p>

              <Link
                href="/collections"
                className="
                  inline-block
                  mt-8
                  px-8
                  py-4
                  bg-[#B8860B]
                  text-white
                  rounded-xl
                "
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-8
              "
            >
              {wishlist.map(
                (item) => (
                  <div
                    key={item.id}
                    className="
                      bg-white
                      border
                      border-[#E7E0D4]
                      rounded-[24px]
                      overflow-hidden
                      hover:shadow-xl
                      transition
                    "
                  >
                    <div
                      className="
                        aspect-[4/5]
                        bg-white
                      "
                    >
                      <img
                        src={item.cover_image}
                        alt={item.name}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    </div>

                    <div className="p-6">
                      <h2
                        className="
                          text-xl
                          font-medium
                        "
                      >
                        {item.name}
                      </h2>

                      <p
                        className="
                          mt-3
                          text-2xl
                          text-[#B8860B]
                          font-medium
                        "
                      >
                        ₹
                        {item.price.toLocaleString()}
                      </p>

                      <div className="mt-6 space-y-3">
                        <Link
                          href={`/products/${item.product_id}`}
                          className="
                            block
                            w-full
                            py-3
                            text-center
                            rounded-xl
                            bg-[#B8860B]
                            text-white
                          "
                        >
                          View Product
                        </Link>

                        <button
                          onClick={() =>
                            removeItem(
                              item.id
                            )
                          }
                          className="
                            w-full
                            py-3
                            rounded-xl
                            border
                            border-red-500
                            text-red-500
                          "
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}