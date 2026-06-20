"use client";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import { supabaseClient } from "@/lib/supabase-client";
import {
  LayoutDashboard,
  FolderOpen,
  ShoppingBag,
  ImageIcon,
  Images,
  Package,
  Users,
  LogOut,
  Store,
  Boxes,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: ShoppingBag,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: FolderOpen,
  },
  {
    label: "Inventory",
    href: "/admin/inventory",
    icon: Boxes,
  },
  {
    label: "Hero Banners",
    href: "/admin/hero-banners",
    icon: ImageIcon,
  },
  {
    label: "Gallery",
    href: "/admin/gallery",
    icon: Images,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: Package,
  },
  {
    label: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

const router = useRouter();


async function handleLogout() {
  await supabaseClient.auth.signOut();

  router.replace("/admin-login");

  router.refresh();
}

  return (
    <aside
      className="
        w-[280px]
        min-h-screen
        bg-white
        border-r
        border-[#E7E0D4]
        flex
        flex-col
        shadow-[0_0_40px_rgba(0,0,0,0.03)]
      "
    >
      {/* Brand */}

      <div className="px-8 pt-10 pb-8">
        <p
          className="
            text-[11px]
            uppercase
            tracking-[8px]
            text-[#B8860B]
            mb-3
          "
        >
          Signature
        </p>

        <h1
          className="
            text-4xl
            font-luxury
            leading-none
            text-[#111111]
          "
        >
          SIGNATURE
        </h1>

        <p
          className="
            mt-3
            text-sm
            text-gray-500
          "
        >
          Luxury Silk Sarees
        </p>

        <div
          className="
            mt-6
            h-px
            bg-gradient-to-r
            from-[#B8860B]
            to-transparent
          "
        />
      </div>

      {/* Navigation */}

      <div className="px-5">
        <nav className="space-y-2">
          {links.map((item) => {
            const Icon = item.icon;

const active =
  pathname.startsWith(
    item.href
  ) &&
  item.href !== "/admin"
    ? true
    : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex
                  items-center
                  gap-4
                  px-4
                  py-4
                  rounded-2xl
                  transition-all
                  ${
                    active
                      ? "bg-[#F6F1E8] text-[#B8860B] font-semibold"
                      : "text-[#333333] hover:bg-[#FAF8F3]"
                  }
                `}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}

      <div className="mt-auto p-6">
        <div className="border-t border-[#E7E0D4] pt-6">
          <Link
            href="/"
            className="
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-2xl
              text-[#333]
              hover:bg-[#FAF8F3]
              transition-all
            "
          >
            <Store size={18} />
            View Store
          </Link>

<button
  onClick={handleLogout}
  className="
    mt-2
    w-full
    flex
    items-center
    gap-3
    px-4
    py-3
    rounded-2xl
    text-red-500
    hover:bg-red-50
    transition-all
  "
>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}