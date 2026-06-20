//-------------------------------------
// BLOCK A
// IMPORTS
//-------------------------------------

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

//-------------------------------------
// BLOCK B
// INTERFACE
//-------------------------------------

interface Props {
  orders: any[];
}


//-------------------------------------
// BLOCK C
// COMPONENT START
//-------------------------------------

export default function OrdersTable({
  orders,
}: Props) {


//-------------------------------------
// BLOCK D
// STATES
//-------------------------------------

const [filter, setFilter] =
  useState("all");

const [search, setSearch] =
  useState("");


  //-------------------------------------
// BLOCK E
// ORDER STATISTICS
//-------------------------------------

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

    packed: orders.filter(
      (o) =>
        o.status === "packed"
    ).length,

    outForDelivery:
      orders.filter(
        (o) =>
          o.status ===
          "out for delivery"
      ).length,

    shipped: orders.filter(
      (o) =>
        o.status ===
        "shipped"
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


//-------------------------------------
// BLOCK F
// FILTERED ORDERS
//-------------------------------------

const filteredOrders =
  orders.filter((order) => {
    const matchesStatus =
      filter === "all" ||
      order.status === filter;

    const matchesSearch =
      order.id
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      order.customer_name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        );

    return (
      matchesStatus &&
      matchesSearch
    );
  });


  //-------------------------------------
// BLOCK G
// FILTER BUTTONS
//-------------------------------------

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
    key: "packed",
    label: "Packed",
    count: stats.packed,
  },
  {
    key: "shipped",
    label: "Shipped",
    count: stats.shipped,
  },
  {
    key: "out for delivery",
    label: "Out For Delivery",
    count:
      stats.outForDelivery,
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


//-------------------------------------
// BLOCK H
// STATUS COLORS
//-------------------------------------

const statusColors: Record<
  string,
  string
> = {
  pending:
    "bg-yellow-100 text-yellow-700",

  confirmed:
    "bg-blue-100 text-blue-700",

  processing:
    "bg-purple-100 text-purple-700",

  packed:
    "bg-indigo-100 text-indigo-700",

  shipped:
    "bg-orange-100 text-orange-700",

  "out for delivery":
    "bg-cyan-100 text-cyan-700",

  delivered:
    "bg-green-100 text-green-700",

  cancelled:
    "bg-red-100 text-red-700",
};



//-------------------------------------
// BLOCK I
// RETURN START
//-------------------------------------

return (
  <main className="space-y-8">


 {/*//-------------------------------------
// BLOCK J
// PAGE HEADER
//-------------------------------------*/}

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

{/*//-------------------------------------
// BLOCK K
// ORDER FILTER CARDS
//-------------------------------------*/}

<div
  className="
    grid
    grid-cols-2
    md:grid-cols-4
    xl:grid-cols-9
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

{/*//-------------------------------------
// BLOCK L
// TABLE WRAPPER
//-------------------------------------*/}

<div
  className="
    bg-white
    rounded-[24px]
    border
    border-[#E7E0D4]
    overflow-hidden
  "
>


{/*  //-------------------------------------
// BLOCK M
// SEARCH BAR
//-------------------------------------*/}

<div
  className="
    p-5
    border-b
    border-[#E7E0D4]
  "
>
  <input
    type="text"
    placeholder="Search by Order ID or Customer"
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value
      )
    }
    className="
      w-full
      px-4
      py-3
      border
      border-[#E7E0D4]
      rounded-xl
      outline-none
    "
  />
</div>


{/*//-------------------------------------
// BLOCK N
// TABLE START
//-------------------------------------*/}

<table className="w-full">


{/*  //-------------------------------------
// BLOCK O
// TABLE HEADER
//-------------------------------------*/}

<thead>
  <tr>
    <th>Order ID</th>
    <th>Customer</th>
    <th>Status</th>
    <th>Total</th>
    <th>Date</th>
    <th>Action</th>
  </tr>
</thead>


{/*//-------------------------------------
// BLOCK P
// TABLE BODY
//-------------------------------------*/}

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
          {order.id.slice(0, 8)}
        </td>

        <td className="p-5">
          {order.customer_name}
        </td>

        <td className="p-5">
          <span
            className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-medium
              capitalize
              ${
                statusColors[
                  order.status
                ] ||
                "bg-gray-100 text-gray-700"
              }
            `}
          >
            {order.status}
          </span>
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


{/*//-------------------------------------
// BLOCK Q
// TABLE END
//-------------------------------------*/}

</table>



{/*//-------------------------------------
// BLOCK R
// CLOSE WRAPPER
//-------------------------------------*/}

</div>


{/*//-------------------------------------
// BLOCK S
// CLOSE COMPONENT
//-------------------------------------*/}

</main>
);
}