"use client";

import { useState } from "react";

interface Props {
  initialValues?: {
    title?: string;
    category?: string;
    sort_order?: number;
    active?: boolean;
    image_url?: string;
  };

  onSubmit: (values: {
    title: string;
    category: string;
    image: File | null;
    sort_order: number;
    active: boolean;
  }) => Promise<void>;
}

export default function GalleryForm({
  initialValues,
  onSubmit,
}: Props) {
  const [title, setTitle] =
    useState(
      initialValues?.title ?? ""
    );

  const [category, setCategory] =
    useState(
      initialValues?.category ??
        "kanchipuram"
    );

  const [sortOrder, setSortOrder] =
    useState(
      initialValues?.sort_order ?? 1
    );

  const [active, setActive] =
    useState(
      initialValues?.active ?? true
    );

  const [image, setImage] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!image && !initialValues) {
      alert(
        "Please select an image"
      );
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        title,
        category,
        image,
        sort_order: sortOrder,
        active,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Title
        </label>

        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full rounded-xl border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Category
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="w-full rounded-xl border p-3"
        >
          <option value="kanchipuram">
            Kanchipuram Silk
          </option>

          <option value="banarasi">
            Banarasi Silk
          </option>

          <option value="soft-silk">
            Soft Silk
          </option>

          <option value="bridal">
            Bridal Silk
          </option>

          <option value="wedding">
            Wedding Collection
          </option>

          <option value="festive">
            Festive Collection
          </option>

          <option value="house-of-signature">
            House Of Signature
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Gallery Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(
              e.target.files?.[0] ||
                null
            )
          }
          className="w-full rounded-xl border p-3"
          required={!initialValues}
        />

        {!image &&
          initialValues?.image_url && (
            <div className="mt-4">
              <img
                src={
                  initialValues.image_url
                }
                alt="Gallery"
                className="
                  h-64
                  w-full
                  rounded-xl
                  border
                  object-cover
                "
              />
            </div>
          )}

        {image && (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(
                image
              )}
              alt="Preview"
              className="
                h-64
                w-full
                rounded-xl
                border
                object-cover
              "
            />
          </div>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Sort Order
        </label>

        <input
          type="number"
          min={1}
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(
              Number(
                e.target.value
              )
            )
          }
          className="w-full rounded-xl border p-3"
        />
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) =>
            setActive(
              e.target.checked
            )
          }
        />

        Active Image
      </label>

      <button
        type="submit"
        disabled={loading}
        className="
          rounded-xl
          bg-black
          px-6
          py-3
          text-white
        "
      >
        {loading
          ? "Saving..."
          : "Save Image"}
      </button>
    </form>
  );
}