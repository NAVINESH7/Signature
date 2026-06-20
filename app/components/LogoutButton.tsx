"use client";

import { useRouter } from "next/navigation";

import { supabaseClient } from "@/lib/supabase-client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await supabaseClient.auth.signOut();

    router.push("/auth/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="
        px-6
        py-3
        rounded-xl
        bg-red-500
        text-white
      "
    >
      Logout
    </button>
  );
}