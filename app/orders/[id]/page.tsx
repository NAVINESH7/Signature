import { redirect } from "next/navigation";

import { supabaseClient } from "@/lib/supabase-client";
import Link from "next/link";

import Navbar from "@/user/frontend/components/Navbar";

import { getOrderById } from "@/user/backend/orders/getOrderById";
import { getOrderItems } from "@/user/backend/orders/getOrderItems";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({
  params,
}: Props) {
  const { id } = await params;

const {
  data: { user },
} = await supabaseClient.auth.getUser();

if (!user) {
  redirect("/login");
}

const order =
  await getOrderById(
    id,
    user.id
  );

  const items =
    await getOrderItems(id);

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

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <Navbar />

      <section className="py-12">
        <div className="luxury-container">
          <Link
            href="/orders"
            className="
              text-[#B8860B]
              font-medium
            "
          >
            ← Back To Orders
          </Link>

          <h1
            className="
              font-luxury
              text-6xl
              mt-6
              mb-10
            "
          >
            Order Details
          </h1>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
            {/* Products */}

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

              <div className="space-y-6">
                {items.map(
                  (item: any) => (
                    <div
                      key={item.id}
                      className="
                        flex
                        gap-5
                        border-b
                        border-[#E7E0D4]
                        pb-5
                      "
                    >
                      <img
                        src={
                          item.product_image
                        }
                        alt={
                          item.product_name
                        }
                        className="
                          w-24
                          h-32
                          object-cover
                          rounded-xl
                        "
                      />

                      <div>
                        <h3 className="font-medium">
                          {
                            item.product_name
                          }
                        </h3>

                        <p className="mt-2 text-gray-500">
                          Qty:
                          {" "}
                          {
                            item.quantity
                          }
                        </p>

                        <p className="mt-2 text-[#B8860B]">
                          ₹
                          {Number(
                            item.price
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Summary */}

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
                  mb-6
                "
              >
                Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Status</span>

                  <span className="capitalize text-[#B8860B]">
                    {order.status}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Total</span>

                  <span>
                    ₹
                    {Number(
                      order.total_amount
                    ).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Date</span>

                  <span>
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div
                className="
                  mt-8
                  pt-8
                  border-t
                  border-[#E7E0D4]
                "
              >
                <h3 className="font-medium mb-4">
                  Shipping Address
                </h3>

                <p>
                  {order.customer_name}
                </p>

                <p>
                  {order.address_line_1}
                </p>

                <p>
                  {order.city},
                  {" "}
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
          </div>
        </div>
      </section>
    </main>
  );
}