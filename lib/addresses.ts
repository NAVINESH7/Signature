import { supabaseClient } from "@/lib/supabase-client";

export async function getAddresses(
  profileId: string
) {
  const { data, error } =
    await supabaseClient
      .from("addresses")
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at", {
        ascending: false,
      });

  if (error) throw error;

  return data;
}

export async function createAddress(
  values: any
) {
  const { data, error } =
    await supabaseClient
      .from("addresses")
      .insert(values)
      .select()
      .single();

  if (error) throw error;

  return data;
}

export async function updateAddress(
  id: string,
  values: any
) {
  const { data, error } =
    await supabaseClient
      .from("addresses")
      .update({
        ...values,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

  if (error) throw error;

  return data;
}

export async function deleteAddress(
  id: string
) {
  const { error } =
    await supabaseClient
      .from("addresses")
      .delete()
      .eq("id", id);

  if (error) throw error;
}

export async function setDefaultAddress(
  profileId: string,
  addressId: string
) {
  await supabaseClient
    .from("addresses")
    .update({
      is_default: false,
    })
    .eq("profile_id", profileId);

  const { error } =
    await supabaseClient
      .from("addresses")
      .update({
        is_default: true,
      })
      .eq("id", addressId);

  if (error) throw error;
}