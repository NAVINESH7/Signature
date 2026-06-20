import Link from "next/link";

import { getGalleryItems } from "@/admin/backend/gallery/getGalleryItems";

export default async function GalleryPage() {
  const items =
    await getGalleryItems();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Gallery
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage gallery images.
          </p>
        </div>

        <Link
          href="/admin/gallery/create"
          className="
            rounded-xl
            bg-black
            px-5
            py-3
            text-white
          "
        >
          Create Image
        </Link>
      </div>

      <div className="rounded-xl border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                Image
              </th>

              <th className="p-4 text-left">
                Title
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Order
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map(
              (item: any) => (
                <tr
                  key={item.id}
                  className="border-b"
                >
                  <td className="p-4">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="
                        h-16
                        w-16
                        rounded-lg
                        object-cover
                        border
                      "
                    />
                  </td>

                  <td className="p-4">
                    {item.title}
                  </td>

                  <td className="p-4">
                    {item.category}
                  </td>

                  <td className="p-4">
                    {item.active
                      ? "Active"
                      : "Inactive"}
                  </td>

                  <td className="p-4">
                    {item.sort_order}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/admin/gallery/edit/${item.id}`}
                      className="
                        rounded-lg
                        border
                        px-4
                        py-2
                        text-sm
                      "
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              )
            )}

            {items.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="
                    p-10
                    text-center
                    text-gray-500
                  "
                >
                  No gallery images found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}