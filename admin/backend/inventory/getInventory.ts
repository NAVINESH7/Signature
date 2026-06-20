import { supabaseClient } from "@/lib/supabase-client";

export type InventoryStatus =
  | "out_of_stock"
  | "low_stock"
  | "medium_stock"
  | "healthy_stock";

type InventoryProduct = {
  id: string;
  name: string;
  stock: number;
  price: number;
  cover_image: string | null;
};

export async function getInventory() {
  const { data, error } = await supabaseClient
    .from("products")
    .select(`
      id,
      name,
      stock,
      price,
      cover_image
    `)
    .order("name");

  if (error) {
    throw new Error(error.message);
  }

  return (
    data?.map((product: InventoryProduct) => ({
      ...product,
      status: getStockStatus(product.stock),
    })) ?? []
  );
}

function getStockStatus(
  stock: number
): InventoryStatus {
  if (stock === 0) {
    return "out_of_stock";
  }

  if (stock <= 5) {
    return "low_stock";
  }

  if (stock <= 20) {
    return "medium_stock";
  }

  return "healthy_stock";
}