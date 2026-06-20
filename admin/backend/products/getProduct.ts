import { supabaseClient } from "@/lib/supabase-client";

export async function getProduct(
  productId: string
) {
  const { data, error } =
    await supabaseClient
      .from("products")
      .select("*")
      .eq("id", productId)
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}