import { supabaseClient } from "@/lib/supabase-client";

export async function deleteProduct(
  productId: string
) {
  const {
    data: files,
    error: listError,
  } = await supabaseClient.storage
    .from("product-images")
    .list(productId);

  if (listError) {
    throw new Error(
      listError.message
    );
  }

  if (
    files &&
    files.length > 0
  ) {
    const filePaths =
      files.map(
        (file) =>
          `${productId}/${file.name}`
      );

    const {
      error: storageError,
    } = await supabaseClient.storage
      .from("product-images")
      .remove(filePaths);

    if (storageError) {
      throw new Error(
        storageError.message
      );
    }
  }

  const {
    error: imagesError,
  } = await supabaseClient
    .from("product_images")
    .delete()
    .eq("product_id", productId);

  if (imagesError) {
    throw new Error(
      imagesError.message
    );
  }

  const {
    error: productError,
  } = await supabaseClient
    .from("products")
    .delete()
    .eq("id", productId);

  if (productError) {
    throw new Error(
      productError.message
    );
  }
}