import Link from "next/link";

export default function ProfileSidebar() {
  return (
    <aside
      className="
        bg-white
        rounded-3xl
        border
        border-[#E7E0D4]
        p-6
        h-fit
      "
    >
      <h2
        className="
          text-xl
          font-semibold
          mb-6
        "
      >
        My Account
      </h2>

      <nav className="space-y-2">
        <Link
          href="/profile"
          className="block rounded-xl px-4 py-3 hover:bg-[#F8F6F2]"
        >
          Dashboard
        </Link>

        <Link
          href="/profile/account"
          className="block rounded-xl px-4 py-3 hover:bg-[#F8F6F2]"
        >
          Account Details
        </Link>

        <Link
          href="/profile/orders"
          className="block rounded-xl px-4 py-3 hover:bg-[#F8F6F2]"
        >
          Orders
        </Link>

        <Link
          href="/profile/addresses"
          className="block rounded-xl px-4 py-3 hover:bg-[#F8F6F2]"
        >
          Addresses
        </Link>
      </nav>
    </aside>
  );
}