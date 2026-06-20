import Link from "next/link";

import { getHeroBanners } from "@/admin/backend/hero-banners/getHeroBanners";

export default async function HeroBannersPage() {
  const banners =
    await getHeroBanners();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Hero Banners
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage homepage hero banners.
          </p>
        </div>

        <Link
          href="/admin/hero-banners/create"
          className="
            rounded-xl
            bg-black
            px-5
            py-3
            text-white
          "
        >
          Create Banner
        </Link>
      </div>

      <div className="rounded-xl border bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                Title
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
            {banners.map(
              (banner: any) => (
                <tr
                  key={banner.id}
                  className="border-b"
                >
                  <td className="p-4">
                    {banner.title}
                  </td>

                  <td className="p-4">
                    {banner.is_active
                      ? "Active"
                      : "Inactive"}
                  </td>

                  <td className="p-4">
  {banner.sort_order}
</td>

<td className="p-4">
  <Link
    href={`/admin/hero-banners/edit/${banner.id}`}
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

            {banners.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="
                    p-10
                    text-center
                    text-gray-500
                  "
                >
                  No hero banners found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}