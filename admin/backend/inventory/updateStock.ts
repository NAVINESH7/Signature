"use server";

import { supabaseClient } from "@/lib/supabase-client";

export async function updateStock(
  productId: string,
  stock: number
) {
  const { error } = await supabaseClient
    .from("products")
    .update({
      stock,
    })
    .eq("id", productId);

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
  };
}