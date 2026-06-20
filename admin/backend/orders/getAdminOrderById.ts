import { supabaseClient } from "@/lib/supabase-client";

export async function getAdminOrderById(
  orderId: string
) {
  const { data, error } =
    await supabaseClient
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}