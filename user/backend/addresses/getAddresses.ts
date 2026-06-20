import { supabaseClient } from "@/lib/supabase-client";

export async function getAddresses(
  customerId: string
) {
  const { data, error } =
    await supabaseClient
      .from("addresses")
      .select("*")
      .eq("customer_id", customerId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}