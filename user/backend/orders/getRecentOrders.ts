import { supabaseAdmin } from "@/lib/supabase-admin";

export async function getRecentOrders(
  userId: string
) {
  const { data: orders, error } =
    await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

  if (error) {
    throw error;
  }

  if (!orders?.length) {
    return [];
  }

  const enrichedOrders =
    await Promise.all(
      orders.map(async (order) => {
        const { data: item } =
          await supabaseAdmin
            .from("order_items")
            .select("*")
            .eq("order_id", order.id)
            .limit(1)
            .single();

        return {
          ...order,
          product_name:
            item?.product_name || "",
          product_image:
            item?.product_image || "",
        };
      })
    );

  return enrichedOrders;
}