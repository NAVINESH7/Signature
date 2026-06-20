interface Props {
  isActive: boolean;
  setIsActive: (
    value: boolean
  ) => void;

  isFeatured: boolean;
  setIsFeatured: (
    value: boolean
  ) => void;

  onSave: () => void;

  loading: boolean;
}

export default function ProductSettingsCard({
  isActive,
  setIsActive,
  isFeatured,
  setIsFeatured,
  onSave,
  loading,
}: Props) {
  return (
    <div
      className="
        bg-white
        border
        border-[#E7E0D4]
        rounded-[32px]
        p-8
        sticky
        top-8
      "
    >
      <h2
        className="
          text-xl
          font-semibold
          mb-8
        "
      >
        Publish
      </h2>

      <div className="space-y-5">
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

          <span>
            Active Product
          </span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) =>
              setIsFeatured(
                e.target.checked
              )
            }
          />

          <span>
            Featured Product
          </span>
        </label>

        <button
          type="button"
          onClick={onSave}
          disabled={loading}
          className="
            w-full
            mt-6
            bg-[#111111]
            text-white
            py-4
            rounded-2xl
            disabled:opacity-50
          "
        >
          {loading
            ? "Saving..."
            : "Save Product"}
        </button>
      </div>
    </div>
  );
}