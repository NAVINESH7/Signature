import { supabaseClient } from "@/lib/supabase-client";

export async function createProductImages(
  images: {
    product_id: string;
    image_url: string;
    is_cover: boolean;
    sort_order: number;
  }[]
) {
  const { error } =
    await supabaseClient
      .from("product_images")
      .insert(images);

  if (error) {
    throw new Error(error.message);
  }
}