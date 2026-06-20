import { supabaseClient } from "@/lib/supabase-client";

export async function getRevenue() {
  const { data } = await supabaseClient
    .from("orders")
    .select("total_amount");

  const totalRevenue =
    data?.reduce(
      (sum, order) =>
        sum + Number(order.total_amount),
      0
    ) ?? 0;

  return totalRevenue;
}