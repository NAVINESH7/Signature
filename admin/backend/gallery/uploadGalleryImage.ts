import { supabaseClient } from "@/lib/supabase-client";

export async function uploadGalleryImage(
  file: File
) {
  const fileExt =
    file.name.split(".").pop();

  const fileName =
    `${Date.now()}.${fileExt}`;

  const filePath =
    `gallery/${fileName}`;

  const { error } =
    await supabaseClient.storage
      .from("gallery-images")
      .upload(filePath, file, {
        upsert: true,
      });

  if (error) {
    throw error;
  }

  const { data } =
    supabaseClient.storage
      .from("gallery-images")
      .getPublicUrl(filePath);

  return {
    imageUrl:
      data.publicUrl,

    imagePath:
      filePath,
  };
}