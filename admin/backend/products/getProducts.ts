import { supabaseClient } from "@/lib/supabase-client";

export async function getProducts() {
  const { data, error } =
    await supabaseClient
      .from("products")
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  if (error) {
    throw new Error(
      error.message
    );
  }

  return data ?? [];
}