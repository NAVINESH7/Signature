import { supabaseAdmin } from "@/lib/supabase-admin";

export async function updateOrderStatus(
  orderId: string,
  status: string
) {
  const { data, error } =
    await supabaseAdmin
      .from("orders")
      .update({
        status,
      })
      .eq("id", orderId)
      .select()
      .single();

  if (error) {
    throw error;
  }

  return data;
}