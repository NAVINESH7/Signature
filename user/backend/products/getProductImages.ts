import { supabaseClient } from "@/lib/supabase-client";

export async function getProductImages(
  productId: string
) {
  const { data, error } =
    await supabaseClient
      .from("product_images")
      .select("*")
      .eq("product_id", productId)
      .order("sort_order");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}