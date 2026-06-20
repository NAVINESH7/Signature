type Category = {
  id: string;
  name: string;
};

interface Props {
  categories: Category[];

  name: string;
  setName: (
    value: string
  ) => void;

  slug: string;

  categoryId: string;
  setCategoryId: (
    value: string
  ) => void;

  description: string;
  setDescription: (
    value: string
  ) => void;
}

export default function ProductInformationCard({
  categories,

  name,
  setName,

  slug,

  categoryId,
  setCategoryId,

  description,
  setDescription,
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
        Product Information
      </h2>

      <div className="space-y-5">

        <input
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          placeholder="Product Name"
          className="
            w-full
            p-4
            rounded-2xl
            border
            border-[#E7E0D4]
          "
        />

        <select
          value={categoryId}
          onChange={(e) =>
            setCategoryId(
              e.target.value
            )
          }
          className="
            w-full
            p-4
            rounded-2xl
            border
            border-[#E7E0D4]
          "
        >
          <option value="">
            Select Category
          </option>

          {categories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )
          )}
        </select>

        <input
          value={slug}
          readOnly
          placeholder="Slug"
          className="
            w-full
            p-4
            rounded-2xl
            border
            border-[#E7E0D4]
            bg-neutral-50
          "
        />

        <textarea
          rows={8}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Description"
          className="
            w-full
            p-4
            rounded-2xl
            border
            border-[#E7E0D4]
          "
        />
      </div>
    </div>
  );
}