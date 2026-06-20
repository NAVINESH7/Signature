import { supabaseClient } from "@/lib/supabase-client";

export async function getOrderById(
  orderId: string,
  userId: string
) {
  const { data, error } =
    await supabaseClient
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("user_id", userId)
      .single();

  if (error) {
    return null;
  }

  return data;
}