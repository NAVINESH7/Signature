import { supabaseClient } from "@/lib/supabase-client";

export async function getProducts(
  categoryId?: string
) {
  let query = supabaseClient
    .from("products")
    .select("*")
    .eq("is_active", true);

  if (categoryId) {
    query = query.eq(
      "category_id",
      categoryId
    );
  }

  const { data, error } =
    await query.order(
      "created_at",
      {
        ascending: false,
      }
    );

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}