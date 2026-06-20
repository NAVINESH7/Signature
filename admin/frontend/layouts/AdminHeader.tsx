"use client";

import { Bell, Search, ChevronDown } from "lucide-react";

export default function AdminHeader() {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        h-[100px]
        bg-[#F8F6F2]/95
        backdrop-blur-md
        border-b
        border-[#E7E0D4]
        px-10
        flex
        items-center
        justify-between
      "
    >
      {/* Left */}

      <div>
        <p
          className="
            uppercase
            tracking-[6px]
            text-[#B8860B]
            text-xs
            mb-2
          "
        >
          Signature
        </p>

        <h1
          className="
            text-3xl
            font-bold
            text-[#111111]
          "
        >
          Luxury Commerce Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Manage products, orders and customers
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        {/* Search */}

        <button
          className="
            h-12
            w-12
            rounded-2xl
            bg-white
            border
            border-[#E7E0D4]
            flex
            items-center
            justify-center
            hover:bg-[#FAF8F3]
            transition-all
          "
        >
          <Search size={18} />
        </button>

        {/* Notifications */}

        <button
          className="
            h-12
            w-12
            rounded-2xl
            bg-white
            border
            border-[#E7E0D4]
            flex
            items-center
            justify-center
            hover:bg-[#FAF8F3]
            transition-all
          "
        >
          <Bell size={18} />
        </button>

        {/* Profile */}

        <div
          className="
            flex
            items-center
            gap-3
            bg-white
            border
            border-[#E7E0D4]
            rounded-2xl
            px-4
            py-2
          "
        >
          <div
            className="
              h-11
              w-11
              rounded-full
              bg-[#B8860B]
              text-white
              flex
              items-center
              justify-center
              font-semibold
            "
          >
            A
          </div>

          <div>
            <p className="text-sm font-semibold text-[#111111]">
              Admin
            </p>

            <p className="text-xs text-gray-500">
              Super Admin
            </p>
          </div>

          <ChevronDown
            size={16}
            className="text-gray-500"
          />
        </div>
      </div>
    </header>
  );
}