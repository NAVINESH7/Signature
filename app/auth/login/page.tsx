"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/lib/supabase-client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const normalizedEmail =
      email.trim().toLowerCase();

    setLoading(true);

    try {
      const { error } =
        await supabaseClient.auth.signInWithPassword(
          {
            email: normalizedEmail,
            password,
          }
        );

      if (error) {
        if (
          error.message
            .toLowerCase()
            .includes("invalid login")
        ) {
          setError(
            "Incorrect email address or password."
          );
        } else {
          setError(error.message);
        }

        return;
      }

      setSuccess(
        "Login successful. Redirecting..."
      );

      setTimeout(() => {
        router.push("/");
      }, 1000);
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
          Welcome Back
        </h2>

        <p className="mt-3 text-gray-500">
          Sign in to your Signature account
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
        onSubmit={handleLogin}
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
              setPassword(e.target.value)
            }
            placeholder="Enter your password"
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

          <div className="flex justify-between mt-3">
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
                ? "Hide Password"
                : "Show Password"}
            </button>

            <Link
              href="/auth/forgot-password"
              className="
                text-sm
                text-[#B8860B]
                hover:underline
              "
            >
              Forgot Password?
            </Link>
          </div>
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
            ? "Signing In..."
            : "Sign In"}
        </button>
      </form>

      <div className="mt-10 text-center">
        <p className="text-gray-500">
          Don't have an account?
        </p>

        <Link
          href="/auth/signup"
          className="
            mt-2
            inline-block
            text-[#B8860B]
            font-medium
            hover:underline
          "
        >
          Create Account
        </Link>
      </div>
    </>
  );
}