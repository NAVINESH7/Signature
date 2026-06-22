"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { getCart } from "@/user/backend/cart/cartStorage";

const navigation = [
  { label: "Collections", href: "/collections" },
  { label: "New Arrivals", href: "/new-arrivals" },
];

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount as EventListener);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener(
        "cartUpdated",
        updateCartCount as EventListener
      );
    };
  }, []);

  const scrollToFooter = () => {
    setMenuOpen(false);
    document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#D4AF37]/35 bg-[#FFF9EC]/90 backdrop-blur-2xl">
      <div className="bg-[#03132F] px-5 py-2 text-center text-[9px] font-medium uppercase tracking-[0.28em] text-[#F3DC8B] sm:text-[10px]">
        Complimentary luxury packaging · Worldwide delivery
      </div>

      <div className="mx-auto flex h-[78px] max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="group relative z-10 shrink-0" aria-label="Signature home">
          <h1 className="font-luxury text-2xl leading-none tracking-[0.08em] text-[#061B42] transition duration-300 group-hover:text-[#A97908] sm:text-3xl">
            SIGNATURE
          </h1>
          <p className="mt-1 text-[7px] font-semibold uppercase tracking-[0.42em] text-[#A97908] sm:text-[8px]">
            Luxury Silk Sarees
          </p>
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A285C]"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={scrollToFooter}
            className="nav-link text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0A285C]"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <IconLink href="/search" label="Search">
            <Search size={18} strokeWidth={1.6} />
          </IconLink>
          <IconLink href="/wishlist" label="Wishlist" hideOnSmall>
            <Heart size={18} strokeWidth={1.6} />
          </IconLink>
          <IconLink href="/profile" label="Account" hideOnSmall>
            <User size={18} strokeWidth={1.6} />
          </IconLink>

          <Link
            href="/cart"
            className="group relative flex h-11 items-center gap-2 rounded-full border border-[#D4AF37]/45 px-3 text-[#061B42] transition duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37] hover:bg-[#061B42] hover:text-[#F3DC8B] hover:shadow-lg sm:px-4"
            aria-label={`Cart with ${cartCount} items`}
          >
            <ShoppingBag size={18} strokeWidth={1.6} />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] xl:block">
              Cart
            </span>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D4AF37] px-1 text-[9px] font-bold text-[#03132F] shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="ml-1 flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/45 text-[#061B42] transition hover:border-[#D4AF37] hover:bg-[#061B42] hover:text-[#F3DC8B] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-[#D4AF37]/35 bg-[#FFF9EC] transition-all duration-500 lg:hidden ${
          menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="space-y-1 px-5 py-6 sm:px-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-[#D4AF37]/25 py-4 font-luxury text-2xl text-[#061B42]"
            >
              {item.label}
              <span className="text-sm text-[#A97908]">↗</span>
            </Link>
          ))}
          <button
            type="button"
            onClick={scrollToFooter}
            className="flex w-full items-center justify-between border-b border-[#D4AF37]/25 py-4 text-left font-luxury text-2xl text-[#061B42]"
          >
            Contact
            <span className="text-sm text-[#A97908]">↓</span>
          </button>
          <div className="flex gap-3 pt-5 sm:hidden">
            <Link href="/wishlist" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/50 py-3 text-xs uppercase tracking-wider text-[#061B42]">
              <Heart size={16} /> Wishlist
            </Link>
            <Link href="/profile" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#D4AF37]/50 py-3 text-xs uppercase tracking-wider text-[#061B42]">
              <User size={16} /> Account
            </Link>
          </div>
        </nav>
      </div>

      <style jsx>{`
        .nav-link {
          position: relative;
          transition: color 300ms ease;
        }
        .nav-link::after {
          position: absolute;
          right: 0;
          bottom: -8px;
          left: 0;
          height: 1px;
          content: "";
          background: #d4af37;
          transform: scaleX(0);
          transition: transform 300ms ease;
        }
        .nav-link:hover {
          color: #a97908;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }
      `}</style>
    </header>
  );
}

function IconLink({
  href,
  label,
  hideOnSmall = false,
  children,
}: {
  href: string;
  label: string;
  hideOnSmall?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`group h-11 items-center gap-2 rounded-full px-3 text-[#061B42] transition duration-300 hover:-translate-y-0.5 hover:bg-[#061B42] hover:text-[#F3DC8B] hover:shadow-lg ${
        hideOnSmall ? "hidden sm:flex" : "flex"
      }`}
    >
      {children}
      <span className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] xl:block">
        {label}
      </span>
    </Link>
  );
}