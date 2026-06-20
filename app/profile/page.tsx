"use client";
import { getUserOrders } from "@/user/backend/orders/getUserOrders";
import Link from "next/link";
import { getWishlist } from "@/user/backend/wishlist/wishlistStorage";
import { getAddresses } from "@/lib/addresses";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/user/frontend/components/Navbar";
import LogoutButton from "@/app/components/LogoutButton";
import { useAuth } from "@/user/frontend/context/AuthContext";
import { supabaseClient } from "@/lib/supabase-client";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [saving, setSaving] = useState(false);
const [orders, setOrders] =
  useState<any[]>([]);

  const [ordersCount, setOrdersCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [addressCount, setAddressCount] = useState(0);

  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
  });

  // 1. Auth Check
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth/login");
    }
  }, [user, loading, router]);

  // 2. Data Fetching (Combined & Optimized Dependencies)
  useEffect(() => {
    async function loadData() {
      if (!user?.id) return;

      try {
        // Fetch stats


const orders =
  await getUserOrders(user.id);

console.log(
  "PROFILE ORDERS:",
  orders
);

setOrders(orders);

setOrdersCount(
  orders.length
);

        const addresses = await getAddresses(user.id);
        setAddressCount(addresses?.length || 0);

        const wishlist = getWishlist();
        setWishlistCount(wishlist.length);

        // Fetch profile
        const { data } = await supabaseClient
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (data) {
          setProfile({
            full_name: data.full_name || "",
            phone: data.phone || "",
          });
        }
      

      } catch (error) {
        console.error(
          "PROFILE LOAD ERROR:",
          error
        );
      }
    }

    loadData();
  }, [user?.id]);


  async function saveProfile() {
    if (!user) return;

    setSaving(true);

    const { error } = await supabaseClient.from("profiles").upsert({
      id: user.id,
      ...profile,
    });

    setSaving(false);

    if (error) {
      alert(error.message); // Consider replacing with a toast notification
      return;
    }

    alert("Profile updated successfully"); // Consider replacing with a toast notification
  }

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <Navbar />

      <section className="py-12">
        <div className="luxury-container">
          <div className="mb-12">
            <p className="uppercase tracking-[4px] text-[#B8860B] text-sm">
              Customer Account
            </p>
            <h1 className="font-luxury text-6xl mt-3">My Profile</h1>
            <p className="mt-3 text-gray-500">Manage your account information</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white border border-[#E7E0D4] rounded-[24px] p-6 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-gray-500">Orders</p>
              <h3 className="font-luxury text-4xl mt-2">{ordersCount}</h3>
            </div>

            <div className="bg-white border border-[#E7E0D4] rounded-[24px] p-6 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-gray-500">Wishlist Items</p>
              <h3 className="font-luxury text-4xl mt-2">{wishlistCount}</h3>
            </div>

            <div className="bg-white border border-[#E7E0D4] rounded-[24px] p-6 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-gray-500">Saved Addresses</p>
              <h3 className="font-luxury text-4xl mt-2">{addressCount}</h3>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
            <div className="bg-white border border-[#E7E0D4] rounded-[24px] p-8 h-fit">
              <div className="w-24 h-24 rounded-full bg-[#B8860B] text-white flex items-center justify-center text-3xl font-semibold mx-auto">
                {(profile.full_name || user.email || "C").charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl text-center mt-6">
                {profile.full_name || "Customer"}
              </h2>
              <p className="text-center text-gray-500 mt-2">{user.email}</p>

              <div className="mt-8 pt-8 border-t border-[#E7E0D4]">
                <Link href="/orders" className="block py-3 px-4 rounded-lg hover:bg-[#F8F6F2]">
                  My Orders
                </Link>
                <Link href="/wishlist" className="block py-3 px-4 rounded-lg hover:bg-[#F8F6F2]">
                  Wishlist
                </Link>
                <Link href="/account/addresses" className="block py-3 px-4 rounded-lg hover:bg-[#F8F6F2]">
                  Manage Addresses
                </Link>
              </div>

              <div className="mt-6">
                <LogoutButton />
              </div>
            </div>


            

            <div className="bg-white border border-[#E7E0D4] rounded-[24px] p-8">
              <h2 className="font-luxury text-4xl mb-8">Personal Information</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  placeholder="Full Name"
                  value={profile.full_name}
                  onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                  className="border rounded-lg p-4 outline-none focus:border-[#B8860B] transition-colors"
                />

                <input
                  placeholder="Phone Number"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="border rounded-lg p-4 outline-none focus:border-[#B8860B] transition-colors"
                />

                <div className="md:col-span-2">
                  <input
                    value={user.email || ""}
                    disabled
                    className="w-full border rounded-lg p-4 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="px-8 py-4 rounded-xl bg-[#B8860B] text-white hover:bg-[#9A7009] transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

              <div className="mt-12 pt-8 border-t border-[#E7E0D4]">
                <h3 className="font-luxury text-2xl mb-6">Quick Access</h3>

                {/* Applied a grid layout to format the Quick Access links nicely */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/orders" className="border border-[#E7E0D4] rounded-2xl p-5 hover:border-[#B8860B] hover:shadow-sm transition block">
                    <p className="font-medium text-gray-900">Orders</p>
                    <p className="text-sm text-gray-500 mt-2">View order history</p>
                  </Link>

                  <Link href="/account/addresses" className="border border-[#E7E0D4] rounded-2xl p-5 hover:border-[#B8860B] hover:shadow-sm transition block">
                    <p className="font-medium text-gray-900">Addresses</p>
                    <p className="text-sm text-gray-500 mt-2">Manage delivery addresses</p>
                  </Link>

                  <Link href="/wishlist" className="border border-[#E7E0D4] rounded-2xl p-5 hover:border-[#B8860B] hover:shadow-sm transition block">
                    <p className="font-medium text-gray-900">Wishlist</p>
                    <p className="text-sm text-gray-500 mt-2">Saved products</p>
                  </Link>
                </div>
              </div>

<div className="mt-12 pt-8 border-t border-[#E7E0D4]">
  <div className="flex items-center justify-between mb-6">
    <h3 className="font-luxury text-2xl">
      Recent Orders
    </h3>

    <Link
      href="/orders"
      className="text-[#B8860B] hover:text-[#9A7009]"
    >
      View All
    </Link>
  </div>

  {orders.length === 0 ? (
    <div className="text-gray-500">
      No orders yet.
    </div>
  ) : (
    <div className="space-y-4">
      {orders.slice(0, 5).map((order) => (
        <div
          key={order.id}
          className="border border-[#E7E0D4] rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >

<div className="flex gap-4 items-center">

{order.product_image ? (
  <img
    src={order.product_image}
    alt={order.product_name}
    className="
      w-16
      h-16
      rounded-xl
      object-cover
    "
  />
) : (
  <div
    className="
      w-16
      h-16
      rounded-xl
      bg-[#F3EFE8]
      border
      border-[#E7E0D4]
    "
  />
)}

  <div>
    <p className="font-medium text-[#111111]">
      {order.product_name}
    </p>

    <p className="text-sm text-gray-500 mt-1">
      Order #
      {String(order.id).slice(0, 8)}
    </p>

    <p className="text-sm text-gray-500">
      {new Date(
        order.created_at
      ).toLocaleDateString()}
    </p>
  </div>
</div>

<span
  className={`
    px-3
    py-1
    rounded-full
    text-sm
    capitalize

    ${
      order.status === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : ""
    }

    ${
      order.status === "confirmed"
        ? "bg-blue-100 text-blue-700"
        : ""
    }

    ${
      order.status === "shipped"
        ? "bg-purple-100 text-purple-700"
        : ""
    }

    ${
      order.status === "delivered"
        ? "bg-green-100 text-green-700"
        : ""
    }

    ${
      order.status === "cancelled"
        ? "bg-red-100 text-red-700"
        : ""
    }
  `}
>
  {order.status}
</span>

          <div className="font-semibold">
            ₹
{Number(
  order.total_amount
).toLocaleString()}
          </div>

          <Link
            href={`/orders/${order.id}`}
            className="px-4 py-2 rounded-lg bg-[#B8860B] text-white hover:bg-[#9A7009] transition"
          >
            View Order
          </Link>
        </div>
      ))}
    </div>
  )}
</div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}