/* =========================================================
   BLOCK A
   IMPORTS
========================================================= */

import Link from "next/link";

import Navbar from "@/user/frontend/components/Navbar";

import { getOrderById } from "@/user/backend/orders/getOrderById";
import { getOrderItems } from "@/user/backend/orders/getOrderItems";

/* =========================================================
   BLOCK B
   INTERFACE
========================================================= */

interface Props {
  params: Promise<{
    id: string;
  }>;
}

/* =========================================================
   BLOCK C
   COMPONENT START
========================================================= */

export default async function OrderPage({
  params,
}: Props) {
  const { id } = await params;

  const order =
    await getOrderById(id);

  const items =
    await getOrderItems(id);

/* =========================================================
   BLOCK D
   ORDER NOT FOUND
========================================================= */

  if (!order) {
    return (
      <main className="min-h-screen bg-[#F8F6F2]">
        <Navbar />

        <div className="luxury-container py-20">
          <h1 className="font-luxury text-5xl">
            Order Not Found
          </h1>
        </div>
      </main>
    );
  }

/* =========================================================
   BLOCK E
   RETURN START
========================================================= */

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <Navbar />

      <section className="py-12">
        <div className="luxury-container">

{/* =========================================================
   BLOCK F
   BACK BUTTON
========================================================= */}

          <Link
            href="/orders"
            className="
              text-[#B8860B]
              font-medium
            "
          >
            ← Back To Orders
          </Link>

{/* =========================================================
   BLOCK G
   PAGE TITLE
========================================================= */}

          <div className="mb-10">
            <h1
              className="
                font-luxury
                text-6xl
                mt-6
              "
            >
              Order Details
            </h1>

            <p className="mt-3 text-gray-500">
              Order #
              {order.id.slice(0, 8)}
            </p>
          </div>

{/* =========================================================
   BLOCK H
   TWO COLUMN LAYOUT
========================================================= */}

          <div
            className="
              grid
              lg:grid-cols-[2fr_1fr]
              gap-10
              items-start
            "
          >

{/* =========================================================
   BLOCK I
   PRODUCTS CARD START
========================================================= */}

            <div
              className="
                bg-white
                border
                border-[#E7E0D4]
                rounded-[24px]
                p-8
              "
            >
              <h2
                className="
                  font-luxury
                  text-3xl
                  mb-8
                "
              >
                Ordered Products
              </h2>

{/* =========================================================
   BLOCK J
   PRODUCTS LOOP
========================================================= */}

              <div className="space-y-6">
                {items.map(
                  (item: any) => (
                    <div
                      key={item.id}
                      className="
                        flex
                        items-center
                        justify-between
                        gap-6
                        p-5
                        rounded-2xl
                        border
                        border-[#E7E0D4]
                      "
                    >
                      {item.product_image && (
                        <img
                          src={
                            item.product_image
                          }
                          alt={
                            item.product_name
                          }
                          className="
                            w-28
                            h-36
                            object-cover
                            rounded-xl
                          "
                        />
                      )}

                      <div className="flex-1">
                        <h3
                          className="
                            text-xl
                            font-semibold
                          "
                        >
                          {
                            item.product_name
                          }
                        </h3>

                        <p
                          className="
                            mt-2
                            text-gray-500
                          "
                        >
                          Quantity:
                          {" "}
                          {
                            item.quantity
                          }
                        </p>

                        <p
                          className="
                            mt-3
                            text-[#B8860B]
                            font-semibold
                            text-xl
                          "
                        >
                          ₹
                          {Number(
                            item.price
                          ).toLocaleString()}
                        </p>
                      </div>

                      <div className="text-right">
                        <p
                          className="
                            text-gray-500
                            text-sm
                          "
                        >
                          Total
                        </p>

                        <p
                          className="
                            text-2xl
                            font-bold
                          "
                        >
                          ₹
                          {Number(
                            item.price *
                              item.quantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

{/* =========================================================
   BLOCK K
   SUMMARY CARD START
========================================================= */}

            <div
              className="
                bg-white
                border
                border-[#E7E0D4]
                rounded-[24px]
                p-8
                h-fit
              "
            >
              <h2
                className="
                  font-luxury
                  text-3xl
                  mb-8
                "
              >
                Order Summary
              </h2>

{/* =========================================================
   BLOCK L
   STATUS TOTAL DATE
========================================================= */}

              <div className="space-y-5">

                <div
                  className="
                    flex
                    justify-between
                    items-center
                  "
                >
                  <span className="text-gray-500">
                    Status
                  </span>

                  <span
                    className="
                      px-4
                      py-2
                      rounded-full
                      bg-[#FFF8EC]
                      text-[#B8860B]
                      font-semibold
                      text-sm
                    "
                  >
                    {order.status}
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    items-center
                  "
                >
                  <span className="text-gray-500">
                    Total
                  </span>

                  <span
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    ₹
                    {Number(
                      order.total_amount
                    ).toLocaleString()}
                  </span>
                </div>

                <div
                  className="
                    flex
                    justify-between
                    items-center
                  "
                >
                  <span className="text-gray-500">
                    Date
                  </span>

                  <span>
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>

              </div>

{/* =========================================================
   BLOCK M
   ORDER PROGRESS
========================================================= */}

              <div
                className="
                  mt-8
                  pt-8
                  border-t
                  border-[#E7E0D4]
                "
              >
                <h3
                  className="
                    text-lg
                    font-semibold
                    mb-5
                  "
                >
                  Order Progress
                </h3>

                <div className="space-y-4">

                  <div>
                    ✓ Confirmed
                  </div>

                  {[
                    "processing",
                    "packed",
                    "shipped",
                    "out for delivery",
                    "delivered",
                  ].includes(
                    order.status.toLowerCase()
                  ) && (
                    <div>
                      ✓ Processing
                    </div>
                  )}

                  {[
                    "packed",
                    "shipped",
                    "out for delivery",
                    "delivered",
                  ].includes(
                    order.status.toLowerCase()
                  ) && (
                    <div>
                      ✓ Packed
                    </div>
                  )}

                  {[
                    "shipped",
                    "out for delivery",
                    "delivered",
                  ].includes(
                    order.status.toLowerCase()
                  ) && (
                    <div>
                      ✓ Shipped
                    </div>
                  )}

                  {[
                    "out for delivery",
                    "delivered",
                  ].includes(
                    order.status.toLowerCase()
                  ) && (
                    <div>
                      ✓ Out For Delivery
                    </div>
                  )}

                  {order.status
                    .toLowerCase()
                    .includes(
                      "delivered"
                    ) && (
                    <div>
                      ✓ Delivered
                    </div>
                  )}
                </div>
              </div>

{/* =========================================================
   BLOCK N
   SHIPPING ADDRESS
========================================================= */}

              <div
                className="
                  mt-8
                  pt-8
                  border-t
                  border-[#E7E0D4]
                "
              >
                <h3
                  className="
                    text-lg
                    font-semibold
                    mb-4
                  "
                >
                  Shipping Address
                </h3>

                <div
                  className="
                    bg-[#FAF8F4]
                    rounded-xl
                    p-5
                    space-y-2
                  "
                >
                  <p className="font-semibold">
                    {order.customer_name}
                  </p>

                  <p>
                    {order.address_line_1}
                  </p>

                  {order.address_line_2 && (
                    <p>
                      {order.address_line_2}
                    </p>
                  )}

                  <p>
                    {order.city},{" "}
                    {order.state}
                  </p>

                  <p>
                    {order.pincode}
                  </p>

                  <p>
                    {order.country}
                  </p>
                </div>
              </div>

{/* =========================================================
   BLOCK O
   CLOSE SUMMARY CARD
========================================================= */}

            </div>

{/* =========================================================
   BLOCK P
   CLOSE GRID
========================================================= */}

          </div>

{/* =========================================================
   BLOCK Q
   CLOSE PAGE
========================================================= */}

        </div>
      </section>
    </main>
  );
}

/* =========================================================
   END OF FILE
========================================================= */