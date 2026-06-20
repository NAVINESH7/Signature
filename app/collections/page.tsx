/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import Navbar from "@/user/frontend/components/Navbar";

import { getProducts } from "@/user/backend/products/getProducts";
import { getCategoryBySlug } from "@/user/backend/categories/getCategoryBySlug";

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
  }>;
}) {
  const params = await searchParams;

  const categorySlug =
    params.category;


let products = [];
let categoryName = "";

if (categorySlug) {
  const category =
    await getCategoryBySlug(
      categorySlug
    );

  if (category) {
    categoryName =
      category.name;

    products =
      await getProducts(
        category.id
      );
  }
} else {
  products =
    await getProducts();
}


  return (
    <main className="bg-[#F8F6F2] min-h-screen">
      <Navbar />

      <section className="pt-36 pb-24">
        <div className="luxury-container">
          <div className="text-center mb-20">
            <p
              className="
                uppercase
                tracking-[8px]
                text-[#B8860B]
                text-sm
                mb-4
              "
            >
              Signature Collection
            </p>

           <h1
  className="
    font-luxury
    text-5xl
    md:text-6xl
  "
>
  {categoryName ||
    "Luxury Silk Sarees"}
</h1>

          </div>

          {products.length === 0 ? (
            <div className="text-center text-gray-500 text-lg">
              No products found.
            </div>
          ) : (
            <div
              className="
                grid
                md:grid-cols-2
                lg:grid-cols-4
                gap-8
              "
            >
              {products.map(
                (product: any) => (
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
                        transition-all
                        duration-500
                        hover:-translate-y-2
                        hover:shadow-xl
                        cursor-pointer
                        h-full
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
                          h-[320px]
                          object-cover
                        "
                      />

                      <div className="p-6">
                        <h2
                          className="
                            font-luxury
                            text-2xl
                            text-[#111111]
                            mb-2
                          "
                        >
                          {product.name}
                        </h2>

                        <p
                          className="
                            text-[#B8860B]
                            text-lg
                            font-medium
                          "
                        >
                          ₹{product.price}
                        </p>

                        {product.compare_price && (
                          <p
                            className="
                              text-gray-400
                              line-through
                              text-sm
                              mt-1
                            "
                          >
                            ₹
                            {
                              product.compare_price
                            }
                          </p>
                        )}

                        <p
                          className="
                            mt-3
                            text-gray-500
                            text-sm
                          "
                        >
                          Stock:{" "}
                          {product.stock}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}