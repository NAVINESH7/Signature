import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug?: string;
};

interface CategoriesTableProps {
  categories?: Category[];
}

export default function CategoriesTable({
  categories = [],
}: CategoriesTableProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Categories
          </h2>
        </div>

        <Link
          href="/admin/categories/new"
          className="
            rounded-xl
            bg-black
            px-5
            py-3
            text-white
            font-medium
          "
        >
          + Add Category
        </Link>
      </div>

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-neutral-200
          bg-white
          shadow-sm
        "
      >
        <table className="w-full">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-6 py-4 text-left">
                Name
              </th>

              <th className="px-6 py-4 text-left">
                Slug
              </th>

              <th className="px-6 py-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="
                    px-6
                    py-10
                    text-center
                    text-neutral-500
                  "
                >
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="
                    border-t
                    border-neutral-200
                  "
                >
                  <td className="px-6 py-4">
                    {category.name}
                  </td>

                  <td className="px-6 py-4 text-neutral-600">
                    {category.slug ?? "-"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/categories/${category.id}/edit`}
                        className="
                          rounded-lg
                          border
                          px-4
                          py-2
                        "
                      >
                        Edit
                      </Link>

                      <button
                        className="
                          rounded-lg
                          border
                          border-red-300
                          px-4
                          py-2
                          text-red-600
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}