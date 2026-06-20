import { supabaseClient } from "@/lib/supabase-client";

export async function getHeroBanner(
  id: string
) {
  const { data, error } =
    await supabaseClient
      .from("hero_banners")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}