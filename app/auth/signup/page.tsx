"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/lib/supabase-client";

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

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

  async function handleSignUp(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const trimmedName =
      fullName.trim();

    const normalizedEmail =
      email.trim().toLowerCase();

    if (trimmedName.length < 2) {
      setError(
        "Please enter your full name."
      );
      return;
    }

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
      const { data, error } =
        await supabaseClient.auth.signUp({
          email: normalizedEmail,
          password,
        });

      if (error) {
        setError(error.message);
        return;
      }

      if (!data.user) {
        setError(
          "User account could not be created."
        );
        return;
      }

      const {
        error: profileError,
      } = await supabaseClient
        .from("profiles")
        .insert({
          id: data.user.id,
          full_name: trimmedName,
        });

      if (profileError) {
        setError(
          `Profile Error: ${profileError.message}`
        );
        return;
      }

      setSuccess(
        "Account created successfully. Redirecting..."
      );

      setTimeout(() => {
        router.push("/");
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
          Create Account
        </h2>

        <p className="mt-3 text-gray-500">
          Join the Signature luxury
          saree experience
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
        onSubmit={handleSignUp}
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
            Full Name
          </label>

          <input
            type="text"
            value={fullName}
            onChange={(e) =>
              setFullName(
                e.target.value
              )
            }
            placeholder="Enter your full name"
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
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
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

        <div>
          <label
            className="
              block
              mb-2
              text-sm
              text-gray-600
            "
          >
            Password
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
            placeholder="Create a password"
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
            placeholder="Confirm password"
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
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-gray-500">
          Already have an account?
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
          Sign In
        </Link>
      </div>
    </>
  );
}