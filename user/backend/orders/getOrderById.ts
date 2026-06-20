import { supabaseClient } from "@/lib/supabase-client";

export async function getOrderById(
  orderId: string
) {
  const { data, error } =
    await supabaseClient
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

  if (error) {
    return null;
  }

  return data;
}