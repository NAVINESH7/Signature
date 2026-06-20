import { supabaseClient } from "@/lib/supabase-client";

export async function updateAddress(
  addressId: string,
  values: {
    label: string;
    full_name: string;
    phone: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default?: boolean;
  }
) {
  const { error } =
    await supabaseClient
      .from("addresses")
      .update(values)
      .eq("id", addressId);

  if (error) {
    throw new Error(error.message);
  }
}