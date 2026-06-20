import { supabaseClient } from "@/lib/supabase-client";

export async function getLowStockCount() {
  const { data } = await supabaseClient
    .from("products")
    .select("stock");

  return (
    data?.filter(
      (product) =>
        Number(product.stock) <= 5
    ).length ?? 0
  );
}