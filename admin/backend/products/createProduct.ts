import { supabaseClient } from "@/lib/supabase-client";

export async function createProduct(values: {
  category_id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_price?: number;
  stock: number;
  cover_image: string;
  is_featured: boolean;
  is_active: boolean;
}) {
  const { data, error } =
    await supabaseClient
      .from("products")
      .insert(values)
      .select()
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}