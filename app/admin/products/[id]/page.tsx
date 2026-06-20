import { notFound } from "next/navigation";

import { getProduct } from "@/admin/backend/products/getProduct";
import { getCategories } from "@/admin/backend/categories/getCategories";

import EditProductForm from "@/admin/frontend/products/EditProductForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage({
  params,
}: Props) {
  const { id } =
    await params;

  const product =
    await getProduct(id);

  if (!product) {
    notFound();
  }

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
          Edit Product
        </h1>

        <p className="mt-3 text-gray-500">
          Update product details.
        </p>
      </div>

      <EditProductForm
        product={product}
        categories={categories}
      />
    </main>
  );
}