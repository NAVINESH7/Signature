
import { notFound } from "next/navigation";

import { getAdminOrderById } from "@/admin/backend/orders/getAdminOrderById";
import { getOrderItems } from "@/user/backend/orders/getOrderItems";

import OrderStatusForm from "@/admin/frontend/orders/OrderStatusForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminOrderDetailsPage({
  params,
}: Props) {
  const { id } = await params;

 const order =
  await getAdminOrderById(id); 

  if (!order) {
    notFound();
  }

  const items =
    await getOrderItems(id);

  return (
    <main className="p-10">
      <div className="mb-10">
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

        <h1 className="text-5xl font-light">
          Order Details
        </h1>
      </div>

      {/* Customer + Shipping */}

      <div className="grid lg:grid-cols-2 gap-8">
        <div
          className="
            bg-white
            border
            rounded-2xl
            p-8
          "
        >
          <h2 className="text-2xl mb-6">
            Customer Information
          </h2>

          <div className="space-y-4">
            <p>
              <strong>Name:</strong>{" "}
              {order.customer_name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.email}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.phone}
            </p>
          </div>
        </div>

        <div
          className="
            bg-white
            border
            rounded-2xl
            p-8
          "
        >
          <h2 className="text-2xl mb-6">
            Shipping Address
          </h2>

          <div className="space-y-2">
            <p>{order.address_line_1}</p>

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
      </div>

      {/* Order Items */}

      <div
        className="
          mt-8
          bg-white
          border
          rounded-2xl
          p-8
        "
      >
        <h2 className="text-2xl mb-6">
          Order Items
        </h2>

        <div className="space-y-5">
          {items.map(
            (item: any) => (
              <div
                key={item.id}
                className="
                  flex
                  justify-between
                  items-center
                  border-b
                  pb-4
                "
              >
                <div>
                  <p className="font-medium">
                    {item.product_name}
                  </p>

                  <p className="text-gray-500">
                    Qty:{" "}
                    {item.quantity}
                  </p>
                </div>

                <div>
                  ₹
                  {Number(
                    item.price
                  ).toLocaleString()}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Status */}

      <div
        className="
          mt-8
          bg-white
          border
          rounded-2xl
          p-8
        "
      >
        <h2 className="text-2xl mb-6">
          Order Status
        </h2>

        <OrderStatusForm
          orderId={order.id}
          currentStatus={
            order.status
          }
        />
      </div>

      {/* Total */}

      <div
        className="
          mt-8
          bg-white
          border
          rounded-2xl
          p-8
        "
      >
        <h2 className="text-2xl mb-4">
          Total Amount
        </h2>

        <p className="text-4xl text-[#B8860B]">
          ₹
          {Number(
            order.total_amount
          ).toLocaleString()}
        </p>
      </div>
    </main>
  );
}
