import { supabaseClient } from "@/lib/supabase-client";

export async function deleteGalleryImage(
  imagePath: string
) {
  const { error } =
    await supabaseClient.storage
      .from("gallery-images")
      .remove([imagePath]);

  if (error) {
    throw error;
  }
}