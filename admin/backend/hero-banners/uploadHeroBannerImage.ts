import { supabaseClient } from "@/lib/supabase-client";

export async function uploadHeroBannerImage(
  file: File,
  bannerId: string,
  fileName: string
) {
  const path = `${bannerId}/${fileName}`;

  console.log("Uploading to:", path);

  const result =
    await supabaseClient.storage
      .from("hero-images")
      .upload(path, file, {
        upsert: true,
      });

  console.log(result);

  if (result.error) {
    throw new Error(
      JSON.stringify(result.error)
    );
  }

  const {
    data: { publicUrl },
  } = supabaseClient.storage
    .from("hero-images")
    .getPublicUrl(path);

  return publicUrl;
}