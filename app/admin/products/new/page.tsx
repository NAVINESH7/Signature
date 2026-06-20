import ProductForm from "@/admin/frontend/products/ProductForm";
import { getCategories } from "@/admin/backend/categories/getCategories";

export default async function NewProductPage() {
  const categories =
    await getCategories();

  return (
    <main className="space-y-8">
      <div>
        <p
          className="
            uppercase
            tracking-[6px]
            text-[#B8860B]
            mb-3
          "
        >
          Signature Admin
        </p>

        <h1
          className="
            text-5xl
            font-bold
          "
        >
          Add Product
        </h1>

        <p className="mt-3 text-gray-500">
          Create a new luxury silk saree.
        </p>
      </div>

      <ProductForm
        categories={categories}
      />
    </main>
  );
}