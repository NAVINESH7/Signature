import { supabaseClient } from "@/lib/supabase-client";

interface UpdateHeroBannerInput {
  title: string;
  subtitle: string;
  image_url: string;
  button_text: string;
  button_link: string;
  sort_order: number;
  is_active: boolean;
}

export async function updateHeroBanner(
  id: string,
  values: UpdateHeroBannerInput
) {
  const { data, error } =
    await supabaseClient
      .from("hero_banners")
      .update(values)
      .eq("id", id)
      .select()
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}