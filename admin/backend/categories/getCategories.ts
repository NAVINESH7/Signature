import { supabaseClient } from "@/lib/supabase-client";

export async function getCategories() {
  const { data, error } =
    await supabaseClient
      .from("categories")
      .select("*")
      .order("name");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}