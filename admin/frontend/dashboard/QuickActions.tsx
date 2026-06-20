import Link from "next/link";

export default function QuickActions() {
  return (
    <div
      className="
        bg-white
        border
        border-[#E7E0D4]
        rounded-3xl
        p-8
      "
    >
      <h2
        className="
          font-luxury
          text-3xl
          mb-6
        "
      >
        Quick Actions
      </h2>

      <div className="grid gap-4">

        <Link
          href="/admin/categories"
          className="
            bg-[#F8F6F2]
            rounded-2xl
            p-4
            hover:bg-[#F4EFE4]
          "
        >
          Add Category
        </Link>

        <Link
          href="/admin/products"
          className="
            bg-[#F8F6F2]
            rounded-2xl
            p-4
            hover:bg-[#F4EFE4]
          "
        >
          Add Product
        </Link>

        <Link
          href="/admin/hero-banners"
          className="
            bg-[#F8F6F2]
            rounded-2xl
            p-4
            hover:bg-[#F4EFE4]
          "
        >
          Add Hero Banner
        </Link>

      </div>
    </div>
  );
}