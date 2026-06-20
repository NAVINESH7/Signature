"use client";

import { useRouter } from "next/navigation";

import { deleteProduct } from "@/admin/backend/products/deleteProduct";

interface Props {
  productId: string;
}

export default function DeleteProductButton({
  productId,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(productId);

      alert(
        "Product deleted successfully"
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete product"
      );
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="
        px-3
        py-2
        rounded-lg
        bg-red-600
        text-white
        text-sm
        font-medium
        hover:bg-red-700
      "
    >
      Delete
    </button>
  );
}