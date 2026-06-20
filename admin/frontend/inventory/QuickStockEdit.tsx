"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateStock } from "@/admin/backend/inventory/updateStock";

interface Props {
  productId: string;
  currentStock: number;
}

export default function QuickStockEdit({
  productId,
  currentStock,
}: Props) {
  const router = useRouter();

  const [stock, setStock] = useState(currentStock);

  const [isPending, startTransition] =
    useTransition();

  const handleSave = () => {
    startTransition(async () => {
      try {
        await updateStock(productId, stock);

        router.refresh();
      } catch (error) {
        console.error(
          "Failed to update stock:",
          error
        );
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min={0}
        value={stock}
        onChange={(e) =>
          setStock(Number(e.target.value))
        }
        className="
          w-20
          rounded-lg
          border
          border-gray-300
          px-2
          py-1
          text-sm
          outline-none
          focus:border-black
        "
      />

      <button
        onClick={handleSave}
        disabled={isPending}
        className="
          rounded-lg
          bg-black
          px-3
          py-1
          text-sm
          text-white
          transition
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {isPending ? "Saving..." : "Save"}
      </button>
    </div>
  );
}