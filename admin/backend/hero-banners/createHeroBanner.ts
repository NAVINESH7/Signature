import { supabaseClient } from "@/lib/supabase-client";

interface CreateHeroBannerInput {
  title: string;
  subtitle: string;
  image_url: string;
  button_text: string;
  button_link: string;
  sort_order: number;
  is_active: boolean;
}

export async function createHeroBanner(
  values: CreateHeroBannerInput
) {
  const { data, error } =
    await supabaseClient
      .from("hero_banners")
      .insert(values)
      .select()
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}