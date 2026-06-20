"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createCategory } from "@/admin/backend/categories/createCategory";

export default function CategoryForm() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  async function handleSubmit() {
    try {
      setLoading(true);

      await createCategory({
        name,
        slug,
        description,
      });

      alert(
        "Category created successfully"
      );

      router.push(
        "/admin/categories"
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create category"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        rounded-[32px]
        border
        border-[#E7E0D4]
        bg-white
        p-8
      "
    >
      <div className="space-y-6">
        <div>
          <label className="mb-2 block font-medium">
            Category Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Kanchipuram Silk"
            className="
              w-full
              rounded-2xl
              border
              border-[#E7E0D4]
              p-4
            "
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Slug
          </label>

          <input
            value={slug}
            readOnly
            className="
              w-full
              rounded-2xl
              border
              border-[#E7E0D4]
              bg-neutral-50
              p-4
            "
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            rows={5}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Category description..."
            className="
              w-full
              rounded-2xl
              border
              border-[#E7E0D4]
              p-4
            "
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="
            rounded-2xl
            bg-black
            px-6
            py-4
            text-white
          "
        >
          {loading
            ? "Saving..."
            : "Save Category"}
        </button>
      </div>
    </div>
  );
}