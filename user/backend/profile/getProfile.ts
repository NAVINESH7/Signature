import { supabaseClient } from "@/lib/supabase-client";

export async function getProfile(email: string) {
  const { data, error } =
    await supabaseClient
      .from("customers")
      .select("*")
      .eq("email", email)
      .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}