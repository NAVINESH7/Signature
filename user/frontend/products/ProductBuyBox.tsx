"use client";

import { useState } from "react";

import { addToCart } from "@/user/backend/cart/addToCart";
import { supabaseClient } from "@/lib/supabase-client";

interface Props {
  product: {
    id: string;
    name: string;
    cover_image: string;
    price: number;
  };
}

export default function ProductBuyBox({
  product,
}: Props) {
  const [quantity, setQuantity] =
    useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );
  };

  const handleAddToCart = () => {
    addToCart({
      id: crypto.randomUUID(),
      product_id: product.id,
      name: product.name,
      image: product.cover_image,
      price: Number(product.price),
      quantity,
    });

    alert(
      `${quantity} item${
        quantity > 1 ? "s" : ""
      } added to cart`
    );
  };

  const handleBuyNow = () => {
    addToCart({
      id: crypto.randomUUID(),
      product_id: product.id,
      name: product.name,
      image: product.cover_image,
      price: Number(product.price),
      quantity,
    });

    window.location.href = "/cart";
  };

  const handleWishlist = async () => {
    const {
      data: { user },
    } =
      await supabaseClient.auth.getUser();

    if (!user) {
      alert(
        "Please login to use wishlist"
      );
      return;
    }

    const { data: existing } =
      await supabaseClient
        .from("wishlist_items")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .maybeSingle();

    if (existing) {
      alert(
        "Already added to wishlist"
      );
      return;
    }

    const { error } =
      await supabaseClient
        .from("wishlist_items")
        .insert({
          user_id: user.id,
          product_id: product.id,
        });

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Added to wishlist");
  };

  return (
    <div
      className="
        sticky
        top-28
        bg-white
        border
        border-[#E7E0D4]
        rounded-[20px]
        p-8
      "
    >
      <p
        className="
          text-3xl
          text-[#B8860B]
          font-medium
        "
      >
        ₹
        {Number(
          product.price
        ).toLocaleString()}
      </p>

      <div className="mt-8">
        <p
          className="
            text-sm
            uppercase
            tracking-[2px]
            text-gray-500
            mb-3
          "
        >
          Quantity
        </p>

        <div
          className="
            flex
            items-center
            border
            border-[#E7E0D4]
            rounded-lg
            overflow-hidden
          "
        >
          <button
            onClick={decreaseQuantity}
            className="
              w-12
              h-12
              text-xl
              border-r
              border-[#E7E0D4]
              hover:bg-gray-50
            "
          >
            −
          </button>

          <div
            className="
              flex-1
              text-center
              font-medium
            "
          >
            {quantity}
          </div>

          <button
            onClick={increaseQuantity}
            className="
              w-12
              h-12
              text-xl
              border-l
              border-[#E7E0D4]
              hover:bg-gray-50
            "
          >
            +
          </button>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-600">
          Total{" "}
          <span
            className="
              font-semibold
              text-[#B8860B]
            "
          >
            ₹
            {(
              Number(product.price) *
              quantity
            ).toLocaleString()}
          </span>
        </p>
      </div>

      <button
        onClick={handleAddToCart}
        className="
          w-full
          mt-8
          py-4
          bg-[#B8860B]
          text-white
          rounded-lg
          hover:bg-[#A87908]
          transition
        "
      >
        Add To Cart
      </button>

      <button
        onClick={handleBuyNow}
        className="
          w-full
          mt-4
          py-4
          border
          border-[#B8860B]
          rounded-lg
          text-[#B8860B]
          hover:bg-[#B8860B]
          hover:text-white
          transition
        "
      >
        Buy Now
      </button>

      <button
        onClick={handleWishlist}
        className="
          w-full
          mt-4
          py-4
          border
          border-[#E7E0D4]
          rounded-lg
          hover:bg-gray-50
          transition
        "
      >
        Add To Wishlist
      </button>

      <div
        className="
          mt-8
          pt-8
          border-t
          border-[#E7E0D4]
        "
      >
        <h3 className="font-medium">
          Delivery Information
        </h3>

        <p className="mt-3 text-gray-600">
          5 – 7 Business Days
        </p>
      </div>
    </div>
  );
}