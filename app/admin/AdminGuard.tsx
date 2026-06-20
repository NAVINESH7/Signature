"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase-client";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [allowed, setAllowed] =
    useState(false);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const {
          data: { user },
        } =
          await supabaseClient.auth.getUser();

        if (!user) {
          router.replace(
            "/admin-login"
          );
          return;
        }

        const {
          data: profile,
        } = await supabaseClient
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (
          !profile ||
          profile.role !== "admin"
        ) {
          router.replace(
            "/admin-login"
          );
          return;
        }

        setAllowed(true);
      } finally {
        setLoading(false);
      }
    }

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}