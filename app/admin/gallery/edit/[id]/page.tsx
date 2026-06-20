"use client";

import { useEffect, useState } from "react";

import {
  useRouter,
  useParams,
} from "next/navigation";

import GalleryForm from "@/admin/frontend/gallery/GalleryForm";

import { getGalleryItem } from "@/admin/backend/gallery/getGalleryItem";
import { updateGalleryItem } from "@/admin/backend/gallery/updateGalleryItem";
import { uploadGalleryImage } from "@/admin/backend/gallery/uploadGalleryImage";
import { deleteGalleryImage } from "@/admin/backend/gallery/deleteGalleryImage";

export default function EditGalleryPage() {
  const router = useRouter();

  const params = useParams();

  const [item, setItem] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadItem() {
      try {
        if (!params?.id) {
          return;
        }

        const data =
          await getGalleryItem(
            params.id as string
          );

        setItem(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [params]);

  async function handleUpdate(
    values: {
      title: string;
      category: string;
      image: File | null;
      sort_order: number;
      active: boolean;
    }
  ) {
    try {
      let imageUrl =
        item.image_url;

      let imagePath =
        item.image_path;

      if (values.image) {
        if (item.image_path) {
          await deleteGalleryImage(
            item.image_path
          );
        }

        const uploaded =
          await uploadGalleryImage(
            values.image
          );

        imageUrl =
          uploaded.imageUrl;

        imagePath =
          uploaded.imagePath;
      }

      await updateGalleryItem(
        item.id,
        {
          title: values.title,
          image_url: imageUrl,
          image_path: imagePath,
          category:
            values.category,
          sort_order:
            values.sort_order,
          active:
            values.active,
        }
      );

      alert(
        "Gallery image updated successfully"
      );

      router.push(
        "/admin/gallery"
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update gallery image"
      );
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="p-6">
        Gallery image not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Gallery Image
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update gallery image details.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <GalleryForm
          initialValues={{
            title: item.title,
            category:
              item.category,
            sort_order:
              item.sort_order,
            active:
              item.active,
            image_url:
              item.image_url,
          }}
          onSubmit={
            handleUpdate
          }
        />
      </div>
    </div>
  );
}