"use client";

import { useMemo, useState } from "react";

import InventoryFilters from "./InventoryFilters";
import InventoryTable from "./InventoryTable";

type InventoryStatus =
  | "out_of_stock"
  | "low_stock"
  | "medium_stock"
  | "healthy_stock";

type Product = {
  id: string;
  name: string;
  stock: number;
  price: number;
  cover_image: string | null;
  status: InventoryStatus;
};

type Filter =
  | "all"
  | "out_of_stock"
  | "low_stock"
  | "medium_stock"
  | "healthy_stock";

interface Props {
  products: Product[];
}

export default function InventoryManager({
  products,
}: Props) {
  const [activeFilter, setActiveFilter] =
    useState<Filter>("all");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") {
      return products;
    }

    return products.filter(
      (product) =>
        product.status === activeFilter
    );
  }, [products, activeFilter]);

  return (
    <div className="space-y-6">
      <InventoryFilters
        activeFilter={activeFilter}
        onChange={setActiveFilter}
      />

      <InventoryTable
        products={filteredProducts}
      />
    </div>
  );
}