import { supabaseAdmin } from "@/lib/supabase-admin";

export async function updateOrderStatus(
  orderId: string,
  status: string
) {
  const { error } =
    await supabaseAdmin
      .from("orders")
      .update({
        status,
      })
      .eq("id", orderId);

  if (error) {
    throw error;
  }
}