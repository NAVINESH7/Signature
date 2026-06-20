import { supabaseClient } from "@/lib/supabase-client";

export async function uploadCategoryImage(
  file: File
) {
  const fileExt = file.name.split(".").pop();

  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const filePath = `categories/${fileName}`;

  const { error } = await supabaseClient.storage
    .from("category-images")
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseClient.storage
    .from("category-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}