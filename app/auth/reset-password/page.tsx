"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/lib/supabase-client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

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

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      const { error } =
        await supabaseClient.auth.updateUser(
          {
            password,
          }
        );

      if (error) {
        setError(error.message);
        return;
      }

      setSuccess(
        "Password updated successfully. Redirecting..."
      );

      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
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
          Reset Password
        </h2>

        <p className="mt-3 text-gray-500">
          Create a new secure password
          for your account.
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
            New Password
          </label>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Enter new password"
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

        <div>
          <label
            className="
              block
              mb-2
              text-sm
              text-gray-600
            "
          >
            Confirm Password
          </label>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            placeholder="Confirm new password"
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
          type="button"
          onClick={() =>
            setShowPassword(
              !showPassword
            )
          }
          className="
            text-sm
            text-gray-500
            hover:text-[#B8860B]
          "
        >
          {showPassword
            ? "Hide Passwords"
            : "Show Passwords"}
        </button>

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
            ? "Updating Password..."
            : "Update Password"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <Link
          href="/auth/login"
          className="
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