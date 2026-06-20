import { supabaseClient } from "@/lib/supabase-client";

export async function getCategoryBySlug(
  slug: string
) {
  const { data, error } =
    await supabaseClient
      .from("categories")
      .select("*")
      .eq("slug", slug)
      .single();

  if (error) {
    return null;
  }

  return data;
}