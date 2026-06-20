import { supabaseClient } from "@/lib/supabase-client";

export async function getPendingOrders() {
  const { count } =
    await supabaseClient
      .from("orders")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "pending");

  return count ?? 0;
}