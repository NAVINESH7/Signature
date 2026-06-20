"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  Heart,
  User,
  ShoppingBag,
} from "lucide-react";

import { getCart } from "@/user/backend/cart/cartStorage";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();

      const total = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCartCount(total);
    };

    updateCartCount();

    window.addEventListener(
      "storage",
      updateCartCount
    );

    window.addEventListener(
      "cartUpdated",
      updateCartCount as EventListener
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateCartCount
      );

      window.removeEventListener(
        "cartUpdated",
        updateCartCount as EventListener
      );
    };
  }, []);

  return (
    <header
      className="
        sticky
        top-0
        z-50
        bg-[#F8F6F2]/95
        backdrop-blur-md
        border-b
        border-[#E7E0D4]
      "
    >
      <div className="w-full px-6">
        <div className="h-24 flex items-center justify-between px-8 lg:px-12">
          
          {/* ========================================= */}
          {/* LEFT SIDE: LOGOS */}
          {/* ========================================= */}
          {/* Increased gap-12 to gap-20 for a much wider space */}
          <div className="flex items-center gap-20">
            
            {/* 1. Place your new logo here */}
            {/* Example: <img src="/your-second-logo.png" alt="Logo" className="h-12 w-auto object-contain" /> */}
            <div className="w-12">
               {/* This empty div is acting as a temporary spacer until you add your img tag above */}
            </div>

            {/* 2. Existing Signature Logo */}
            <Link href="/">
              <div>
                <h1
                  className="
                    font-luxury
                    text-3xl
                    text-[#111111]
                    leading-none
                  "
                >
                  SIGNATURE
                </h1>

                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[3px]
                    text-[#B8860B]
                    mt-1
                  "
                >
                  Luxury Silk Sarees
                </p>
              </div>
            </Link>
          </div>

          {/* ========================================= */}
          {/* RIGHT SIDE: LINKS & ICONS */}
          {/* ========================================= */}
          <div className="flex items-center gap-10">
            {/* Desktop Menu */}
            <nav
              className="
                hidden
                lg:flex
                items-center
                gap-10
              "
            >
              <Link
                href="/collections"
                className="hover:text-[#B8860B] transition-colors"
              >
                Collections
              </Link>

              <Link
                href="/new-arrivals"
                className="hover:text-[#B8860B] transition-colors"
              >
                New Arrivals
              </Link>

<button
  onClick={() => {
    document
      .getElementById("footer")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className="
    hover:text-[#B8860B]
    transition-colors
  "
>
  Contact
</button>

            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center gap-6">

<Link href="/search">
  <Search size={18} />
  <span>Search</span>
</Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  hover:text-[#B8860B]
                  transition-colors
                "
              >
                <Heart size={18} />
                <span>Wishlist</span>
              </Link>

              {/* Account */}
              <Link
                href="/profile"
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  hover:text-[#B8860B]
                  transition-colors
                "
              >
                <User size={18} />
                <span>Account</span>
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="
                  relative
                  flex
                  items-center
                  gap-2
                  text-sm
                  hover:text-[#B8860B]
                  transition-colors
                "
              >
                <ShoppingBag size={18} />
                <span>Cart</span>

                {cartCount > 0 && (
                  <span
                    className="
                      absolute
                      -top-2
                      -right-4
                      w-5
                      h-5
                      rounded-full
                      bg-[#B8860B]
                      text-white
                      text-[11px]
                      font-medium
                      flex
                      items-center
                      justify-center
                    "
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  );
}