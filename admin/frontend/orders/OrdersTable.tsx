"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

interface Props {
  orders: any[];
}

export default function OrdersTable({
  orders,
}: Props) {
  const [filter, setFilter] =
    useState("all");

  const stats = useMemo(
    () => ({
      all: orders.length,
      pending: orders.filter(
        (o) =>
          o.status === "pending"
      ).length,
      confirmed: orders.filter(
        (o) =>
          o.status ===
          "confirmed"
      ).length,
      processing: orders.filter(
        (o) =>
          o.status ===
          "processing"
      ).length,
      shipped: orders.filter(
        (o) =>
          o.status === "shipped"
      ).length,
      delivered: orders.filter(
        (o) =>
          o.status ===
          "delivered"
      ).length,
      cancelled: orders.filter(
        (o) =>
          o.status ===
          "cancelled"
      ).length,
    }),
    [orders]
  );

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter(
          (order) =>
            order.status ===
            filter
        );

  const filters = [
    {
      key: "all",
      label: "All Orders",
      count: stats.all,
    },
    {
      key: "pending",
      label: "Pending",
      count: stats.pending,
    },
    {
      key: "confirmed",
      label: "Confirmed",
      count: stats.confirmed,
    },
    {
      key: "processing",
      label: "Processing",
      count: stats.processing,
    },
    {
      key: "shipped",
      label: "Shipped",
      count: stats.shipped,
    },
    {
      key: "delivered",
      label: "Delivered",
      count: stats.delivered,
    },
    {
      key: "cancelled",
      label: "Cancelled",
      count: stats.cancelled,
    },
  ];

  return (
    <main className="space-y-8">
      <div>
        <p
          className="
            uppercase
            tracking-[6px]
            text-[#B8860B]
            mb-2
          "
        >
          Signature Admin
        </p>

        <h1
          className="
            text-5xl
            font-bold
            text-[#111111]
          "
        >
          Orders
        </h1>

        <p className="mt-3 text-gray-600">
          Manage customer orders
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          xl:grid-cols-7
          gap-4
        "
      >
        {filters.map((item) => (
          <button
            key={item.key}
            onClick={() =>
              setFilter(item.key)
            }
            className={`
              rounded-2xl
              border
              p-5
              text-left
              transition
              ${
                filter === item.key
                  ? "border-[#B8860B] bg-[#FFF8EC]"
                  : "border-[#E7E0D4] bg-white"
              }
            `}
          >
            <p
              className="
                text-xs
                uppercase
                tracking-[3px]
                text-[#B8860B]
              "
            >
              {item.label}
            </p>

            <p
              className="
                mt-3
                text-3xl
                font-bold
              "
            >
              {item.count}
            </p>
          </button>
        ))}
      </div>

      <div
        className="
          bg-white
          rounded-[24px]
          border
          border-[#E7E0D4]
          overflow-hidden
        "
      >
        <table className="w-full">
          <thead>
            <tr
              className="
                border-b
                border-[#E7E0D4]
              "
            >
              <th className="p-5 text-left">
                Order ID
              </th>

              <th className="p-5 text-left">
                Customer
              </th>

              <th className="p-5 text-left">
                Status
              </th>

              <th className="p-5 text-left">
                Total
              </th>

              <th className="p-5 text-left">
                Date
              </th>

              <th className="p-5 text-left">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map(
              (order: any) => (
                <tr
                  key={order.id}
                  className="
                    border-b
                    border-[#E7E0D4]
                  "
                >
                  <td className="p-5">
                    {order.id.slice(
                      0,
                      8
                    )}
                  </td>

                  <td className="p-5">
                    {
                      order.customer_name
                    }
                  </td>

                  <td className="p-5 capitalize">
                    {order.status}
                  </td>

                  <td className="p-5">
                    ₹
                    {Number(
                      order.total_amount
                    ).toLocaleString()}
                  </td>

                  <td className="p-5">
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-5">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="
                        px-4
                        py-2
                        bg-black
                        text-white
                        rounded-lg
                      "
                    >
                      View
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}