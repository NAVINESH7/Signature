"use client";

import Link from "next/link";
import { useState } from "react";

import { supabaseClient } from "@/lib/supabase-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    setLoading(true);

    try {
      const { error } =
        await supabaseClient.auth.resetPasswordForEmail(
          email.trim().toLowerCase(),
          {
            redirectTo:
              "http://localhost:3000/auth/reset-password",
          }
        );

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(
        "Password reset instructions have been sent to your email."
      );
    } catch (err) {
      console.error(err);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-10 text-center">
        <h2
          className="
            text-4xl
            font-light
            text-[#111111]
          "
        >
          Forgot Password
        </h2>

        <p className="mt-3 text-gray-500">
          Enter your email address and
          we'll send you a password reset
          link.
        </p>
      </div>

      {error && (
        <div
          className="
            mb-6
            rounded-xl
            border
            border-red-200
            bg-red-50
            p-4
            text-sm
            text-red-700
          "
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="
            mb-6
            rounded-xl
            border
            border-green-200
            bg-green-50
            p-4
            text-sm
            text-green-700
          "
        >
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label
            className="
              block
              mb-2
              text-sm
              text-gray-600
            "
          >
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            className="
              w-full
              h-14
              px-5
              rounded-xl
              border
              border-[#E7E0D4]
              focus:outline-none
              focus:border-[#B8860B]
            "
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            h-14
            rounded-xl
            bg-[#111111]
            text-white
            font-medium
            transition
            hover:bg-black
            disabled:opacity-50
          "
        >
          {loading
            ? "Sending Reset Link..."
            : "Send Reset Link"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-gray-500">
          Remember your password?
        </p>

        <Link
          href="/auth/login"
          className="
            mt-2
            inline-block
            text-[#B8860B]
            font-medium
            hover:underline
          "
        >
          Back to Sign In
        </Link>
      </div>
    </>
  );
}