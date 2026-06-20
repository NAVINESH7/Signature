import { supabaseClient } from "@/lib/supabase-client";

export async function getGalleryItem(
  id: string
) {
  const { data, error } =
    await supabaseClient
      .from("gallery_items")
      .select("*")
      .eq("id", id)
      .single();

  if (error) {
    throw error;
  }

  return data;
}