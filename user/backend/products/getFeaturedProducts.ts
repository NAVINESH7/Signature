import { supabaseClient } from "@/lib/supabase-client";

export async function getFeaturedProducts() {
  const { data, error } =
    await supabaseClient
      .from("products")
      .select("*")
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("created_at", {
        ascending: false,
      });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}