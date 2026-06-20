import { supabaseClient } from "@/lib/supabase-client";

interface CreateCategoryParams {
  name: string;
  slug: string;
  description: string;
}

export async function createCategory({
  name,
  slug,
  description,
}: CreateCategoryParams) {
  const { data, error } =
    await supabaseClient
      .from("categories")
      .insert({
        name,
        slug,
        description,
        is_active: true,
      })
      .select()
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}