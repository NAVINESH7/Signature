/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import Navbar from "@/user/frontend/components/Navbar";
import { getProducts } from "@/user/backend/products/getProducts";

export default async function NewArrivalsPage() {
  const products =
    await getProducts();

  return (
    <main className="bg-[#F8F6F2] min-h-screen">
      <Navbar />

      <section className="pt-36 pb-24">
        <div className="luxury-container">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[8px] text-[#B8860B] text-sm mb-4">
              Signature Collection
            </p>

            <h1 className="font-luxury text-6xl">
              New Arrivals
            </h1>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
              >
                <div className="bg-white rounded-[20px] overflow-hidden border border-[#E7E0D4]">
                  <img
                    src={product.cover_image}
                    alt={product.name}
                    className="w-full h-[320px] object-cover"
                  />

                  <div className="p-6">
                    <h3 className="font-luxury text-2xl">
                      {product.name}
                    </h3>

                    <p className="text-[#B8860B] mt-2">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}