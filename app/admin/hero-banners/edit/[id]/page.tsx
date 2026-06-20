"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import HeroBannerForm from "@/admin/frontend/hero-banners/HeroBannerForm";

import { getHeroBanner } from "@/admin/backend/hero-banners/getHeroBanner";
import { updateHeroBanner } from "@/admin/backend/hero-banners/updateHeroBanner";
import { uploadHeroBannerImage } from "@/admin/backend/hero-banners/uploadHeroBannerImage";

export default function EditHeroBannerPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = use(params);

  const router = useRouter();

  const [banner, setBanner] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadBanner();
  }, [id]);

  async function loadBanner() {
    try {
      const data =
        await getHeroBanner(id);

      setBanner(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(
    values: {
      title: string;
      subtitle: string;
      image: File | null;
      button_text: string;
      button_link: string;
      sort_order: number;
      is_active: boolean;
    }
  ) {
    let imageUrl =
      banner.image_url;

    if (values.image) {
      imageUrl =
        await uploadHeroBannerImage(
          values.image,
          banner.id,
          "banner.jpg"
        );
    }

    await updateHeroBanner(
      banner.id,
      {
        title: values.title,
        subtitle:
          values.subtitle,
        image_url: imageUrl,
        button_text:
          values.button_text,
        button_link:
          values.button_link,
        sort_order:
          values.sort_order,
        is_active:
          values.is_active,
      }
    );

    router.push(
      "/admin/hero-banners"
    );

    router.refresh();
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Hero Banner
        </h1>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <HeroBannerForm
          initialValues={banner}
          onSubmit={
            handleUpdate
          }
        />
      </div>
    </div>
  );
}