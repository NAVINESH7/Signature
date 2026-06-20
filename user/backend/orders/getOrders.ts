import { supabaseAdmin } from "@/lib/supabase-admin";

export async function getOrders() {
  const { data, error } =
    await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    throw error;
  }

  return data ?? [];
}