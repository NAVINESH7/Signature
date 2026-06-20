import { supabaseClient } from "@/lib/supabase-client";

export async function getProductById(id: string) {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}