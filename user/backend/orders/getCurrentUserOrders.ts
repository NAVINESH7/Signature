import { supabaseClient } from "@/lib/supabase-client";

export async function getCurrentUserOrders(
  userId: string
) {
  const { data, error } =
    await supabaseClient
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    throw error;
  }

  return data ?? [];
}