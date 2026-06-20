import { supabaseClient } from "@/lib/supabase-client";

export async function searchProducts(
  query: string
) {
  const { data, error } =
    await supabaseClient
      .from("products")
      .select(`
        *,
        categories (
          name,
          slug
        )
      `)
      .eq("is_active", true);

  if (error) {
    throw new Error(error.message);
  }

  const search =
    query.toLowerCase();

  return (
    data?.filter((product) => {
      return (
        product.name
          ?.toLowerCase()
          .includes(search) ||

        product.description
          ?.toLowerCase()
          .includes(search) ||

        product.categories?.name
          ?.toLowerCase()
          .includes(search) ||

        product.categories?.slug
          ?.toLowerCase()
          .includes(search)
      );
    }) ?? []
  );
}