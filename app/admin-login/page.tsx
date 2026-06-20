"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/lib/supabase-client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { data, error } =
      await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const user =
      data.user;

    const { data: profile } =
      await supabaseClient
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (
      profile?.role !==
      "admin"
    ) {
      await supabaseClient.auth.signOut();

      setError(
        "Access denied"
      );

      setLoading(false);
      return;
    }

    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
      <form
        onSubmit={
          handleLogin
        }
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full border p-3 rounded mb-4"
        />

        {error && (
          <p className="text-red-500 mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded"
        >
          {loading
            ? "Signing In..."
            : "Login"}
        </button>
      </form>
    </div>
  );
}