"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProductInformationCard from "./ProductInformationCard";
import ProductPricingCard from "./ProductPricingCard";
import ProductImagesCard from "./ProductImagesCard";
import ProductSettingsCard from "./ProductSettingsCard";

import { createProduct } from "@/admin/backend/products/createProduct";
import { uploadProductImage } from "@/admin/backend/products/uploadProductImage";
import { createProductImages } from "@/admin/backend/products/createProductImages";
import { supabaseClient } from "@/lib/supabase-client";

type Category = {
  id: string;
  name: string;
};

interface Props {
  categories: Category[];
}

export default function ProductForm({
  categories,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  // Product Information

  const [name, setName] =
    useState("");

  const [categoryId, setCategoryId] =
    useState("");

  const [description, setDescription] =
    useState("");

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  // Pricing

  const [price, setPrice] =
    useState("");

  const [comparePrice, setComparePrice] =
    useState("");

  const [stock, setStock] =
    useState("");

  // Images

  const [coverImage, setCoverImage] =
    useState<File | null>(null);

  const [galleryImages, setGalleryImages] =
    useState<File[]>([]);

  // Settings

  const [isActive, setIsActive] =
    useState(true);

  const [isFeatured, setIsFeatured] =
    useState(false);

  async function handleSaveProduct() {
    try {
      setLoading(true);

      if (!name.trim()) {
        alert(
          "Please enter product name"
        );
        return;
      }

      if (!categoryId) {
        alert(
          "Please select category"
        );
        return;
      }

      if (!coverImage) {
        alert(
          "Please select cover image"
        );
        return;
      }

      // Create Product First

      const product =
        await createProduct({
          category_id:
            categoryId,

          name,

          slug,

          description,

          price:
            Number(price),

          compare_price:
            comparePrice
              ? Number(
                  comparePrice
                )
              : undefined,

          stock:
            Number(stock),

          cover_image: "",

          is_featured:
            isFeatured,

          is_active:
            isActive,
        });

      // Upload Cover Image

      const coverImageUrl =
        await uploadProductImage(
          coverImage,
          product.id,
          "cover.jpg"
        );

      // Update Product Cover Image

      const {
        error: coverError,
      } = await supabaseClient
        .from("products")
        .update({
          cover_image:
            coverImageUrl,
        })
        .eq("id", product.id);

      if (coverError) {
        throw new Error(
          coverError.message
        );
      }

      // Upload Gallery Images

      const galleryRecords = [];

      for (
        let i = 0;
        i < galleryImages.length;
        i++
      ) {
        const file =
          galleryImages[i];

        const extension =
          file.name
            .split(".")
            .pop() || "jpg";

        const imageUrl =
          await uploadProductImage(
            file,
            product.id,
            `gallery-${i + 1}.${extension}`
          );

        galleryRecords.push({
          product_id:
            product.id,

          image_url:
            imageUrl,

          is_cover:
            false,

          sort_order:
            i + 1,
        });
      }

      // Save Gallery Images

      if (
        galleryRecords.length > 0
      ) {
        await createProductImages(
          galleryRecords
        );
      }

      alert(
        "Product created successfully"
      );

      router.push(
        "/admin/products"
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        grid
        xl:grid-cols-[1fr_340px]
        gap-8
      "
    >
      <div className="space-y-8">
        <ProductInformationCard
          categories={categories}
          name={name}
          setName={setName}
          slug={slug}
          categoryId={categoryId}
          setCategoryId={
            setCategoryId
          }
          description={
            description
          }
          setDescription={
            setDescription
          }
        />

        <ProductPricingCard
          price={price}
          setPrice={setPrice}
          comparePrice={
            comparePrice
          }
          setComparePrice={
            setComparePrice
          }
          stock={stock}
          setStock={setStock}
        />

        <ProductImagesCard
          coverImage={
            coverImage
          }
          setCoverImage={
            setCoverImage
          }
          galleryImages={
            galleryImages
          }
          setGalleryImages={
            setGalleryImages
          }
        />
      </div>

      <ProductSettingsCard
        isActive={isActive}
        setIsActive={
          setIsActive
        }
        isFeatured={
          isFeatured
        }
        setIsFeatured={
          setIsFeatured
        }
        onSave={
          handleSaveProduct
        }
        loading={loading}
      />
    </div>
  );
}