"use client";

import { useRouter } from "next/navigation";

import GalleryForm from "@/admin/frontend/gallery/GalleryForm";

import { createGalleryItem } from "@/admin/backend/gallery/createGalleryItem";
import { updateGalleryItem } from "@/admin/backend/gallery/updateGalleryItem";
import { uploadGalleryImage } from "@/admin/backend/gallery/uploadGalleryImage";

export default function CreateGalleryPage() {
  const router = useRouter();

  async function handleCreate(values: {
    title: string;
    category: string;
    image: File | null;
    sort_order: number;
    active: boolean;
  }) {
    if (!values.image) {
      alert("Gallery image is required");
      return;
    }

    try {
      console.log(
        "STEP 1: Creating gallery item"
      );

      const item =
        await createGalleryItem({
          title: values.title,
          imageUrl: "",
          imagePath: "",
          category:
            values.category,
          sortOrder:
            values.sort_order,
          active:
            values.active,
        });

      console.log(
        "STEP 1 SUCCESS",
        item
      );

      console.log(
        "STEP 2: Uploading image"
      );

      const imageData =
        await uploadGalleryImage(
          values.image
        );

      console.log(
        "STEP 2 SUCCESS",
        imageData
      );

      console.log(
        "STEP 3: Updating gallery item"
      );

      await updateGalleryItem(
        item.id,
        {
          title: values.title,
          image_url:
            imageData.imageUrl,
          image_path:
            imageData.imagePath,
          category:
            values.category,
          sort_order:
            values.sort_order,
          active:
            values.active,
        }
      );

      alert(
        "Gallery image created successfully"
      );

      router.push(
        "/admin/gallery"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "GALLERY ERROR:",
        error
      );

      if (
        error instanceof Error
      ) {
        alert(error.message);
      } else {
        alert(
          "Failed to create gallery image"
        );
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Create Gallery Image
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Add a new gallery image.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <GalleryForm
          onSubmit={handleCreate}
        />
      </div>
    </div>
  );
}