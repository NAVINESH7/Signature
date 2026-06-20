interface Props {
  coverImage: File | null;
  setCoverImage: (
    file: File | null
  ) => void;

  galleryImages: File[];
  setGalleryImages: (
    files: File[]
  ) => void;
}

export default function ProductImagesCard({
  coverImage,
  setCoverImage,
  galleryImages,
  setGalleryImages,
}: Props) {
  return (
    <div
      className="
        bg-white
        border
        border-[#E7E0D4]
        rounded-[32px]
        p-8
      "
    >
      <h2
        className="
          text-2xl
          font-semibold
          mb-8
        "
      >
        Product Images
      </h2>

      <div className="space-y-8">

        {/* Cover Image */}

        <div>
          <label className="block mb-3 font-medium">
            Cover Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setCoverImage(
                e.target.files?.[0] ||
                  null
              )
            }
            className="
              w-full
              rounded-2xl
              border
              border-[#E7E0D4]
              p-4
            "
          />

          {coverImage && (
            <p className="mt-2 text-sm text-gray-500">
              Selected:
              {" "}
              {coverImage.name}
            </p>
          )}
        </div>

        {/* Gallery Images */}

        <div>
          <label className="block mb-3 font-medium">
            Gallery Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setGalleryImages(
                Array.from(
                  e.target.files || []
                )
              )
            }
            className="
              w-full
              rounded-2xl
              border
              border-[#E7E0D4]
              p-4
            "
          />

          {galleryImages.length >
            0 && (
            <div className="mt-4 space-y-2">
              {galleryImages.map(
                (
                  image,
                  index
                ) => (
                  <p
                    key={index}
                    className="
                      text-sm
                      text-gray-500
                    "
                  >
                    {image.name}
                  </p>
                )
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}