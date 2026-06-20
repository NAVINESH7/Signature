interface Props {
  image: File | null;
  setImage: (
    file: File | null
  ) => void;
}

export default function HeroBannerImageCard({
  image,
  setImage,
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
        Hero Banner Image
      </h2>

      <div>
        <label className="block mb-3 font-medium">
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
          className="
            w-full
            rounded-2xl
            border
            border-[#E7E0D4]
            p-4
          "
        />

        {image && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-4">
              {image.name}
            </p>

            <img
              src={URL.createObjectURL(
                image
              )}
              alt="Preview"
              className="
                h-64
                w-full
                rounded-2xl
                object-cover
                border
              "
            />
          </div>
        )}
      </div>
    </div>
  );
}