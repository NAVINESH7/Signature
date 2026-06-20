import { supabaseAdmin } from "@/lib/supabase-admin";

export async function getGalleryItems() {
  const { data, error } =
    await supabaseAdmin
      .from("gallery_items")
      .select("*")
      .order(
        "sort_order",
        { ascending: true }
      );

  if (error) {
    throw error;
  }

  return data ?? [];
}