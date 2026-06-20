import { supabaseClient } from "@/lib/supabase-client";

export async function getDashboardStats() {
  const [
    productsResult,
    customersResult,
    ordersResult,
  ] = await Promise.all([
    supabaseClient
      .from("products")
      .select("*", { count: "exact", head: true }),

    supabaseClient
      .from("profiles")
      .select("*", { count: "exact", head: true }),

    supabaseClient
      .from("orders")
      .select("*", { count: "exact", head: true }),
  ]);

  return {
    totalProducts: productsResult.count ?? 0,
    totalCustomers: customersResult.count ?? 0,
    totalOrders: ordersResult.count ?? 0,
  };
}