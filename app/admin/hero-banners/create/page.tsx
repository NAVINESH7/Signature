"use client";

import { useRouter } from "next/navigation";

import HeroBannerForm from "@/admin/frontend/hero-banners/HeroBannerForm";

import { createHeroBanner } from "@/admin/backend/hero-banners/createHeroBanner";
import { updateHeroBanner } from "@/admin/backend/hero-banners/updateHeroBanner";
import { uploadHeroBannerImage } from "@/admin/backend/hero-banners/uploadHeroBannerImage";

export default function CreateHeroBannerPage() {
  const router = useRouter();



async function handleCreate(values: {
  title: string;
  subtitle: string;
  image: File | null;
  button_text: string;
  button_link: string;
  sort_order: number;
  is_active: boolean;
})


  {



if (!values.image) {
  alert("Banner image is required");
  return;
}


    try {
      console.log(
        "STEP 1: Creating banner"
      );

      const banner =
        await createHeroBanner({
          title: values.title,
          subtitle: values.subtitle,
          image_url: "",
          button_text:
            values.button_text,
          button_link:
            values.button_link,
          sort_order:
            values.sort_order,
          is_active:
            values.is_active,
        });

      console.log(
        "STEP 1 SUCCESS",
        banner
      );

      console.log(
        "STEP 2: Uploading image"
      );

      const imageUrl =
        await uploadHeroBannerImage(
          values.image,
          banner.id,
          "banner.jpg"
        );

      console.log(
        "STEP 2 SUCCESS",
        imageUrl
      );

      console.log(
        "STEP 3: Updating banner"
      );

      const updatedBanner =
        await updateHeroBanner(
          banner.id,
          {
            title: values.title,
            subtitle: values.subtitle,
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

      console.log(
        "STEP 3 SUCCESS",
        updatedBanner
      );

      alert(
        "Hero banner created successfully"
      );

      router.push(
        "/admin/hero-banners"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "HERO BANNER ERROR:",
        error
      );

      if (
        error instanceof Error
      ) {
        alert(error.message);
      } else {
        alert(
          "Failed to create hero banner"
        );
      }
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Create Hero Banner
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Add a new homepage banner.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <HeroBannerForm
          onSubmit={handleCreate}
        />
      </div>
    </div>
  );
}