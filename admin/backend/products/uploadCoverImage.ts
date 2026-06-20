import { supabaseClient } from "@/lib/supabase-client";

export async function uploadCoverImage(
  file: File
) {
  const fileExt =
    file.name.split(".").pop();

  const fileName =
    `${Date.now()}-${Math.random()}.${fileExt}`;

  const { error } =
    await supabaseClient.storage
      .from("product-images")
      .upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabaseClient.storage
    .from("product-images")
    .getPublicUrl(fileName);

  return publicUrl;
}