import { supabaseClient } from "@/lib/supabase-client";

export async function getDashboardData() {
  const { data: products } =
    await supabaseClient
      .from("products")
      .select("*");

  const totalProducts =
    products?.length ?? 0;

  const lowStock =
    products?.filter(
      (product: any) =>
        Number(product.stock ?? 0) <= 5
    ).length ?? 0;

  return {
    revenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalCustomers: 0,
    totalProducts,
    lowStock,
  };
}