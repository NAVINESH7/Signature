import { supabaseClient } from "@/lib/supabase-client";

export async function deleteHeroBanner(
  id: string
) {
  const { error } =
    await supabaseClient
      .from("hero_banners")
      .delete()
      .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return {
    success: true,
  };
}