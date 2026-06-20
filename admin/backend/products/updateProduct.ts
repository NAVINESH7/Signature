import { supabaseClient } from "@/lib/supabase-client";

export async function updateProduct(
  productId: string,
  values: {
    category_id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    compare_price?: number;
    stock: number;
    is_featured: boolean;
    is_active: boolean;
  }
) {
  const { error } =
    await supabaseClient
      .from("products")
      .update(values)
      .eq("id", productId);

  if (error) {
    throw new Error(error.message);
  }
}