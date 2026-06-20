import Link from "next/link";
import ProductsTable from "@/admin/frontend/products/ProductsTable";
import { getProducts } from "@/admin/backend/products/getProducts";
import DeleteProductButton from "@/admin/frontend/products/DeleteProductButton";

export default async function AdminProductsPage() {
  const products =
    await getProducts();

  return (
    <main className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p
            className="
              uppercase
              tracking-[6px]
              text-[#B8860B]
              mb-2
            "
          >
            Signature Admin
          </p>

          <h1
            className="
              text-5xl
              font-bold
              text-[#111111]
            "
          >
            Products
          </h1>

          <p className="mt-3 text-gray-600">
            Manage your luxury silk saree
            catalog.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="
            px-6
            py-4
            bg-[#111111]
            text-white
            rounded-2xl
            font-medium
          "
        >
          + Add Product
        </Link>
      </div>

      <ProductsTable
  products={products}
/>
    </main>
  );
}