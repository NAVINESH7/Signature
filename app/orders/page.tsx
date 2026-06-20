"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Navbar from "@/user/frontend/components/Navbar";
import { useAuth } from "@/user/frontend/context/AuthContext";
import { getCurrentUserOrders } from "@/user/backend/orders/getCurrentUserOrders";

export default function OrdersPage() {
  const { user, loading } = useAuth();

  const [orders, setOrders] =
    useState<any[]>([]);

  useEffect(() => {
    async function loadOrders() {
      if (!user?.id) return;

      const data =
        await getCurrentUserOrders(
          user.id
        );

      setOrders(data);
    }

    loadOrders();
  }, [user?.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F6F2]">
        <Navbar />
        <div className="luxury-container py-20">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <Navbar />

      <section className="py-12">
        <div className="luxury-container">
          <div className="mb-12">
            <h1 className="font-luxury text-6xl">
              My Orders
            </h1>

            <p className="mt-3 text-gray-500">
              View your order history
            </p>
          </div>

          {orders.length === 0 ? (
            <div
              className="
                bg-white
                border
                border-[#E7E0D4]
                rounded-[24px]
                p-16
                text-center
              "
            >
              <h2 className="font-luxury text-3xl">
                No Orders Yet
              </h2>

              <p className="mt-3 text-gray-500">
                Your orders will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order: any) => (
                <div
                  key={order.id}
                  className="
                    bg-white
                    border
                    border-[#E7E0D4]
                    rounded-[24px]
                    p-8
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      lg:flex-row
                      lg:items-center
                      lg:justify-between
                      gap-6
                    "
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[3px] text-gray-500">
                        Order ID
                      </p>

                      <p className="mt-2 font-medium">
                        {order.id.slice(0, 8)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[3px] text-gray-500">
                        Status
                      </p>

                      <span className="inline-block mt-2 px-3 py-1 rounded-full text-sm capitalize bg-purple-100 text-purple-700">
                        {order.status}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[3px] text-gray-500">
                        Total
                      </p>

                      <p className="mt-2 font-medium">
                        ₹
                        {Number(
                          order.total_amount
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[3px] text-gray-500">
                        Date
                      </p>

                      <p className="mt-2">
                        {new Date(
                          order.created_at
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <Link
                      href={`/orders/${order.id}`}
                      className="
                        px-6
                        py-3
                        rounded-xl
                        bg-[#B8860B]
                        text-white
                        text-center
                        hover:bg-[#A87908]
                        transition
                      "
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}