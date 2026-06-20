"use client";

import { useState } from "react";
import Link from "next/link";

import Navbar from "@/user/frontend/components/Navbar";
import { searchProducts } from "@/user/backend/products/searchProducts";

export default function SearchPage() {
  const [query, setQuery] =
    useState("");

  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  async function handleSearch(
    value: string
  ) {
    setQuery(value);

    if (!value.trim()) {
      setProducts([]);
      return;
    }

    try {
      setLoading(true);

      const results =
        await searchProducts(
          value
        );

      setProducts(results);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[#F8F6F2] min-h-screen">
      <Navbar />

      <section className="pt-36 pb-24">
        <div className="luxury-container max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="
                uppercase
                tracking-[8px]
                text-[#B8860B]
                text-sm
                mb-4
              "
            >
              Search
            </p>

            <h1
              className="
                font-luxury
                text-5xl
                md:text-6xl
              "
            >
              Find Your Saree
            </h1>
          </div>

          <input
            value={query}
            onChange={(e) =>
              handleSearch(
                e.target.value
              )
            }
            placeholder="Search products..."
            className="
              w-full
              p-5
              rounded-2xl
              border
              border-[#E7E0D4]
              bg-white
              text-lg
            "
          />

          {loading && (
            <p className="mt-8 text-center">
              Searching...
            </p>
          )}

          <div
            className="
              grid
              md:grid-cols-2
              lg:grid-cols-4
              gap-8
              mt-12
            "
          >
            {products.map(
              (product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                >
                  <div
                    className="
                      bg-white
                      rounded-[20px]
                      overflow-hidden
                      border
                      border-[#E7E0D4]
                    "
                  >
                    <img
                      src={
                        product.cover_image
                      }
                      alt={
                        product.name
                      }
                      className="
                        w-full
                        h-[260px]
                        object-cover
                      "
                    />

                    <div className="p-5">
                      <h3
                        className="
                          font-luxury
                          text-xl
                        "
                      >
                        {product.name}
                      </h3>

                      <p
                        className="
                          text-[#B8860B]
                          mt-2
                        "
                      >
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}