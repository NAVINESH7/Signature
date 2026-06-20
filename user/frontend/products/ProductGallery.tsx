"use client";

import { useState } from "react";

interface Props {
  coverImage: string;
  galleryImages: string[];
  productName: string;
}

export default function ProductGallery({
  coverImage,
  galleryImages,
  productName,
}: Props) {
  const images = [
    coverImage,
    ...galleryImages,
  ];

  const [selectedImage, setSelectedImage] =
    useState(0);

  const nextImage = () => {
    setSelectedImage((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );
  };

  const previousImage = () => {
    setSelectedImage((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );
  };

  return (
    <div>
      {/* Main Image */}

      <div className="relative">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="
            w-full
            h-[700px]
            object-contain
            bg-white
            border
            border-[#E7E0D4]
          "
        />

        {/* Left */}

        <button
          onClick={previousImage}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            w-12
            h-12
            rounded-full
            bg-white
            shadow-lg
          "
        >
          ←
        </button>

        {/* Right */}

        <button
          onClick={nextImage}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            w-12
            h-12
            rounded-full
            bg-white
            shadow-lg
          "
        >
          →
        </button>
      </div>

      {/* Counter */}

      <div className="text-center mt-4">
        {selectedImage + 1} / {images.length}
      </div>

      {/* Thumbnails */}

      <div className="grid grid-cols-6 gap-3 mt-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() =>
              setSelectedImage(index)
            }
            className={`
              border
              overflow-hidden
              ${
                selectedImage === index
                  ? "border-[#B8860B]"
                  : "border-[#E7E0D4]"
              }
            `}
          >
            <img
              src={image}
              alt={productName}
              className="
                h-24
                w-full
                object-cover
              "
            />
          </button>
        ))}
      </div>
    </div>
  );
}