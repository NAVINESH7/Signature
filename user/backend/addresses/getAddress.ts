import { supabaseClient } from "@/lib/supabase-client";

export async function getAddress(
  addressId: string
) {
  const { data, error } =
    await supabaseClient
      .from("addresses")
      .select("*")
      .eq("id", addressId)
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}