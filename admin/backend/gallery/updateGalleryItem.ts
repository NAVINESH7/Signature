import { supabaseClient } from "@/lib/supabase-client";

interface UpdateGalleryItemInput {
  title?: string;
  image_url?: string;
  image_path?: string;
  category?: string;
  sort_order?: number;
  active?: boolean;
}

export async function updateGalleryItem(
  id: string,
  values: UpdateGalleryItemInput
) {
  const { data, error } =
    await supabaseClient
      .from("gallery_items")
      .update(values)
      .eq("id", id)
      .select()
      .single();

  if (error) {
    throw error;
  }

  return data;
}