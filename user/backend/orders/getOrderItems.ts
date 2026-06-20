import { supabaseAdmin } from "@/lib/supabase-admin";

export async function getOrderItems(
  orderId: string
) {
  const { data, error } =
    await supabaseAdmin
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

  if (error) {
    throw error;
  }

  return data ?? [];
}