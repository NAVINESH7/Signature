import { supabaseClient } from "@/lib/supabase-client";

export async function updateProfile(
  id: string,
  values: {
    full_name: string;
    phone: string;
  }
) {
  const { error } =
    await supabaseClient
      .from("customers")
      .update(values)
      .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}