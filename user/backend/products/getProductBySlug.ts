import { supabaseClient } from "@/lib/supabase-client";

export async function getProductBySlug(
  slug: string
) {
  const { data, error } =
    await supabaseClient
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}