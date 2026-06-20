import { supabaseClient } from "@/lib/supabase-client";

interface CreateGalleryItemInput {
  title: string;

  imageUrl: string;

  imagePath: string;

  category?: string;

  sortOrder?: number;

  active?: boolean;
}

export async function createGalleryItem(
  input: CreateGalleryItemInput
) {
  const { data, error } =
    await supabaseClient
      .from("gallery_items")
      .insert({
        title: input.title,

        image_url:
          input.imageUrl,

        image_path:
          input.imagePath,

        category:
          input.category,

        sort_order:
          input.sortOrder ?? 0,

        active:
          input.active ?? true,
      })
      .select()
      .single();

  if (error) {
    throw error;
  }

  return data;
}