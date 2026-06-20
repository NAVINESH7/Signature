"use client";

import { useState } from "react";

interface Props {
  initialValues?: {
    title?: string;
    subtitle?: string;
    image_url?: string;
    button_text?: string;
    button_link?: string;
    sort_order?: number;
    is_active?: boolean;
  };

  onSubmit: (values: {
    title: string;
    subtitle: string;
    image: File | null;
    button_text: string;
    button_link: string;
    sort_order: number;
    is_active: boolean;
  }) => Promise<void>;
}
export default function HeroBannerForm({
  initialValues,
  onSubmit,
}: Props) {


const [title, setTitle] =
  useState(
    initialValues?.title ?? ""
  );

const [subtitle, setSubtitle] =
  useState(
    initialValues?.subtitle ?? ""
  );

const [buttonText, setButtonText] =
  useState(
    initialValues?.button_text ?? ""
  );

const [buttonLink, setButtonLink] =
  useState(
    initialValues?.button_link ?? ""
  );

const [sortOrder, setSortOrder] =
  useState(
    initialValues?.sort_order ?? 1
  );

const [isActive, setIsActive] =
  useState(
    initialValues?.is_active ?? true
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
    "Please select a banner image"
  );
  return;
}

    try {
      setLoading(true);

      await onSubmit({
  title,
  subtitle,
  image,
  button_text: buttonText,
  button_link: buttonLink,
  sort_order: sortOrder,
  is_active: isActive,
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
          Subtitle
        </label>

        <textarea
          value={subtitle}
          onChange={(e) =>
            setSubtitle(e.target.value)
          }
          rows={3}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Banner Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(
              e.target.files?.[0] || null
            )
          }
          className="w-full rounded-xl border p-3"
         required={!initialValues}
        />
{!image &&
  initialValues?.image_url && (
    <div className="mt-4">
      <img
        src={initialValues.image_url}
        alt="Banner"
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
          Button Text
        </label>

        <input
          value={buttonText}
          onChange={(e) =>
            setButtonText(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Button Link
        </label>

        <input
          value={buttonLink}
          onChange={(e) =>
            setButtonLink(e.target.value)
          }
          className="w-full rounded-xl border p-3"
        />
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
              Number(e.target.value)
            )
          }
          className="w-full rounded-xl border p-3"
        />
      </div>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={isActive}
          onChange={(e) =>
            setIsActive(
              e.target.checked
            )
          }
        />

        Active Banner
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
          : "Save Banner"}
      </button>
    </form>
  );
}