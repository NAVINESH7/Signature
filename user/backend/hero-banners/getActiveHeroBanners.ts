import { supabaseClient } from "@/lib/supabase-client";

export async function getActiveHeroBanners() {
  const { data, error } =
    await supabaseClient
      .from("hero_banners")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}