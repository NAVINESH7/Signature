"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ProductInformationCard from "./ProductInformationCard";
import ProductPricingCard from "./ProductPricingCard";
import ProductSettingsCard from "./ProductSettingsCard";

import { updateProduct } from "@/admin/backend/products/updateProduct";

type Category = {
  id: string;
  name: string;
};

interface Props {
  product: {
    id: string;
    category_id: string;
    name: string;
    description: string;
    price: number;
    compare_price: number | null;
    stock: number;
    is_active: boolean;
    is_featured: boolean;
  };

  categories: Category[];
}

export default function EditProductForm({
  product,
  categories,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [name, setName] =
    useState(product.name);

  const [categoryId, setCategoryId] =
    useState(product.category_id);

  const [description, setDescription] =
    useState(
      product.description || ""
    );

  const [price, setPrice] =
    useState(
      String(product.price)
    );

  const [comparePrice, setComparePrice] =
    useState(
      product.compare_price
        ? String(
            product.compare_price
          )
        : ""
    );

  const [stock, setStock] =
    useState(
      String(product.stock)
    );

  const [isActive, setIsActive] =
    useState(product.is_active);

  const [isFeatured, setIsFeatured] =
    useState(product.is_featured);

  const slug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  async function handleSave() {
    try {
      setLoading(true);

      await updateProduct(
        product.id,
        {
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

          is_featured:
            isFeatured,

          is_active:
            isActive,
        }
      );

      alert(
        "Product updated successfully"
      );

      router.push(
        "/admin/products"
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update product"
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
        onSave={handleSave}
        loading={loading}
      />
    </div>
  );
}