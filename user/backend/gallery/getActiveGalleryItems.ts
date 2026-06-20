import { supabaseClient } from "@/lib/supabase-client";

export async function getActiveGalleryItems() {
  const { data, error } =
    await supabaseClient
      .from("gallery_items")
      .select("*")
      .eq("active", true)
      .order(
        "sort_order",
        { ascending: true }
      );

  if (error) {
    throw error;
  }

  return data ?? [];
}