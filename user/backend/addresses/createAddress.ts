import { supabaseClient } from "@/lib/supabase-client";

export async function createAddress(values: {
  customer_id: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
}) {
  const { error } =
    await supabaseClient
      .from("addresses")
      .insert(values);

  if (error) {
    throw new Error(error.message);
  }
}