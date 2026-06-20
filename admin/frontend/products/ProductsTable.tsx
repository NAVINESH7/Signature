"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import DeleteProductButton from "./DeleteProductButton";

interface Props {
  products: any[];
}

export default function ProductsTable({
  products,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("all");

  const filteredProducts =
    useMemo(() => {
      return products.filter(
        (product) => {
          const matchesSearch =
            product.name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            product.categories?.name
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesCategory =
            category === "all"
              ? true
              : product
                  .categories?.name ===
                category;

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [
      products,
      search,
      category,
    ]);

  const categories =
    Array.from(
      new Set(
        products.map(
          (product) =>
            product.categories
              ?.name
        )
      )
    ).filter(Boolean);

  return (
    <>
      <div
        className="
          bg-white
          border
          border-[#E7E0D4]
          rounded-[24px]
          p-6
          flex
          gap-4
          mb-6
        "
      >
        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search products..."
          className="
            flex-1
            border
            border-[#E7E0D4]
            rounded-xl
            px-4
            py-3
          "
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="
            border
            border-[#E7E0D4]
            rounded-xl
            px-4
            py-3
          "
        >
          <option value="all">
            All Categories
          </option>

          {categories.map(
            (category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            )
          )}
        </select>
      </div>

      <div
        className="
          bg-white
          rounded-[32px]
          border
          border-[#E7E0D4]
          overflow-hidden
        "
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E7E0D4]">
              <th className="text-left px-6 py-5">
                Image
              </th>

              <th className="text-left px-6 py-5">
                Product
              </th>

              <th className="text-left px-6 py-5">
                Category
              </th>

              <th className="text-left px-6 py-5">
                Price
              </th>

              <th className="text-left px-6 py-5">
                Stock
              </th>

              <th className="text-left px-6 py-5">
                Status
              </th>

              <th className="text-left px-6 py-5">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map(
              (product) => (
                <tr
                  key={product.id}
                  className="
                    border-b
                    border-[#E7E0D4]
                  "
                >
                  <td className="px-6 py-5">
                    <img
                      src={
                        product.cover_image
                      }
                      alt={
                        product.name
                      }
                      className="
                        h-16
                        w-16
                        rounded-xl
                        object-cover
                        border
                        border-[#E7E0D4]
                      "
                    />
                  </td>

                  <td className="px-6 py-5 font-medium">
                    {product.name}
                  </td>

                  <td className="px-6 py-5">
                    {
                      product
                        .categories
                        ?.name
                    }
                  </td>

                  <td className="px-6 py-5">
                    ₹{product.price}
                  </td>

                  <td className="px-6 py-5">
                    {product.stock}
                  </td>

                  <td className="px-6 py-5">
                    {product.is_active
                      ? "Active"
                      : "Inactive"}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="
                          px-3
                          py-2
                          border
                          border-[#E7E0D4]
                          rounded-lg
                          text-sm
                        "
                      >
                        Edit
                      </Link>

                      <DeleteProductButton
                        productId={
                          product.id
                        }
                      />
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}