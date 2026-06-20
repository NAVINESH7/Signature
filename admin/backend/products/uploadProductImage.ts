import { supabaseClient } from "@/lib/supabase-client";

export async function uploadProductImage(
  file: File,
  productId: string,
  fileName: string
) {
  const path = `${productId}/${fileName}`;

  const { error } =
    await supabaseClient.storage
      .from("product-images")
      .upload(path, file, {
        upsert: true,
      });

  if (error) {
    throw new Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabaseClient.storage
    .from("product-images")
    .getPublicUrl(path);

  return publicUrl;
}