import { supabaseClient } from "@/lib/supabase-client";

export async function getHeroBanners() {
  const { data, error } =
    await supabaseClient
      .from("hero_banners")
      .select("*")
      .order("sort_order", {
        ascending: true,
      });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}