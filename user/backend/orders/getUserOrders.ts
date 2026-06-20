import { supabaseClient } from "@/lib/supabase-client";

export async function getUserOrders(
  userId: string
) {
  const { data: orders, error } =
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

  if (!orders?.length) {
    return [];
  }

  const enrichedOrders =
    await Promise.all(
      orders.map(async (order) => {
        const { data: items, error } =
          await supabaseClient
            .from("order_items")
            .select("*")
            .eq("order_id", order.id);

        console.log(
          "ORDER ITEMS:",
          order.id,
          items
        );

        const item = items?.[0];

        return {
          ...order,
          product_name:
            item?.product_name ?? "",
          product_image:
            item?.product_image ?? "",
        };
      })
    );

  return enrichedOrders;
}