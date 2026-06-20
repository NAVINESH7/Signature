"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "@/user/frontend/components/Navbar";

import { getCart } from "@/user/backend/cart/cartStorage";
import { removeFromCart } from "@/user/backend/cart/removeFromCart";
import { updateQuantity } from "@/user/backend/cart/updateQuantity";

import type { CartItem } from "@/user/backend/cart/types";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    setCart(getCart());
  };

  const handleRemove = (
    productId: string
  ) => {
    removeFromCart(productId);
    loadCart();
  };

  const increaseQuantity = (
    productId: string,
    currentQuantity: number
  ) => {
    updateQuantity(
      productId,
      currentQuantity + 1
    );

    loadCart();
  };

  const decreaseQuantity = (
    productId: string,
    currentQuantity: number
  ) => {
    updateQuantity(
      productId,
      currentQuantity - 1
    );

    loadCart();
  };

  const totalProducts = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <Navbar />

      <section className="pt-12 pb-24">
        <div className="luxury-container">
          <div className="mb-12">
            <h1 className="font-luxury text-5xl md:text-7xl">
              Shopping Cart
            </h1>

            <p className="mt-3 text-lg text-gray-500">
              {totalProducts} item
              {totalProducts !== 1 ? "s" : ""}
              {" "}in your cart
            </p>
          </div>

          {cart.length === 0 ? (
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
              <h2 className="font-luxury text-3xl mb-4">
                Your Cart Is Empty
              </h2>

              <p className="text-gray-500">
                Browse our collections and
                discover luxury silk sarees.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
              {/* Cart Items */}

              <div className="space-y-6">
                {cart.map((item) => (
  <div
    key={item.id}
                    className="
                      bg-white
                      border
                      border-[#E7E0D4]
                      rounded-[24px]
                      p-6
                    "
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div
                        className="
                          w-full
                          md:w-40
                          h-56
                          overflow-hidden
                          rounded-xl
                          border
                          border-[#E7E0D4]
                          flex-shrink-0
                        "
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="
                            w-full
                            h-full
                            object-cover
                          "
                        />
                      </div>

                      <div className="flex-1">
                        <h2
                          className="
                            font-luxury
                            text-3xl
                            mb-3
                          "
                        >
                          {item.name}
                        </h2>

                        <p
                          className="
                            text-[#B8860B]
                            text-2xl
                            font-medium
                          "
                        >
                          ₹
                          {item.price.toLocaleString()}
                        </p>

                        {/* Quantity */}

                        <div className="mt-6">
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
                              w-fit
                              border
                              border-[#E7E0D4]
                              rounded-lg
                              overflow-hidden
                            "
                          >
                            <button
                              onClick={() =>
                                decreaseQuantity(
                                  item.product_id,
                                  item.quantity
                                )
                              }
                              className="
                                w-10
                                h-10
                                border-r
                                border-[#E7E0D4]
                              "
                            >
                              −
                            </button>

                            <div
                              className="
                                w-14
                                text-center
                                font-medium
                              "
                            >
                              {item.quantity}
                            </div>

                            <button
                              onClick={() =>
                                increaseQuantity(
                                  item.product_id,
                                  item.quantity
                                )
                              }
                              className="
                                w-10
                                h-10
                                border-l
                                border-[#E7E0D4]
                              "
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="mt-5">
                          <p className="font-medium text-lg">
                            Item Total:
                            {" "}
                            ₹
                            {(
                              item.price *
                              item.quantity
                            ).toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            handleRemove(
                              item.product_id
                            )
                          }
                          className="
                            mt-5
                            text-red-500
                          "
                        >
                          Remove Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}

              <div
                className="
                  bg-white
                  border
                  border-[#E7E0D4]
                  rounded-[24px]
                  p-8
                  h-fit
                  sticky
                  top-28
                "
              >
                <h2
                  className="
                    font-luxury
                    text-4xl
                    mb-8
                  "
                >
                  Order Summary
                </h2>

                <div className="space-y-5">
                  <div className="flex justify-between">
                    <span>Products</span>
                    <span>{totalProducts}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      ₹
                      {subtotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>

                  <div
                    className="
                      border-t
                      border-[#E7E0D4]
                      pt-5
                      flex
                      justify-between
                      text-xl
                      font-semibold
                    "
                  >
                    <span>Total</span>

                    <span>
                      ₹
                      {subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Link
  href="/checkout"
  className="
    block
    w-full
    mt-8
    py-4
    rounded-xl
    bg-[#B8860B]
    text-white
    font-medium
    hover:bg-[#A87908]
    transition
    text-center
  "
>
  Proceed To Checkout
</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}