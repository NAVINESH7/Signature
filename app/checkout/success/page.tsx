"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Navbar from "@/user/frontend/components/Navbar";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("id");

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <Navbar />

      <section className="py-20 md:py-28">
        <div className="luxury-container">
          <div
            className="
              max-w-4xl
              mx-auto
              bg-white
              border
              border-[#E7E0D4]
              rounded-[32px]
              p-8
              md:p-16
              text-center
              shadow-sm
            "
          >
            {/* Success Icon */}

            <div
              className="
                w-28
                h-28
                mx-auto
                rounded-full
                bg-green-100
                flex
                items-center
                justify-center
                text-6xl
              "
            >
              ✓
            </div>

            {/* Heading */}

            <h1
              className="
                font-luxury
                text-3xl
                md:text-5xl
                mt-10
                leading-tight
              "
            >
              Order Placed Successfully
            </h1>

            <p
              className="
                mt-5
                text-lg
                text-gray-600
                max-w-2xl
                mx-auto
              "
            >
              Thank you for choosing Signature.
              Your order has been received and
              is being prepared for processing.
            </p>

            {/* Order ID */}

            {orderId && (
              <div
                className="
                  mt-10
                  max-w-xl
                  mx-auto
                  bg-[#F8F6F2]
                  border
                  border-[#E7E0D4]
                  rounded-2xl
                  p-8
                "
              >
                <p
                  className="
                    uppercase
                    tracking-[3px]
                    text-xs
                    text-gray-500
                  "
                >
                  Order Reference
                </p>

                <p
                  className="
                    mt-3
                    text-xl
                    font-medium
                    break-all
                  "
                >
                  {orderId}
                </p>
              </div>
            )}

            {/* Order Info */}

            <div
              className="
                mt-10
                grid grid-cols-1 md:grid-cols-3
                gap-6
                text-left
              "
            >
              <div
                className="
                  bg-[#F8F6F2]
                  rounded-2xl
                  p-6
                "
              >
                <p className="text-sm text-gray-500">
                  Order Status
                </p>

                <p className="mt-2 font-medium">
                  Processing
                </p>
              </div>

              <div
                className="
                  bg-[#F8F6F2]
                  rounded-2xl
                  p-6
                "
              >
                <p className="text-sm text-gray-500">
                  Payment
                </p>

                <p className="mt-2 font-medium">
                  Received
                </p>
              </div>

              <div
                className="
                  bg-[#F8F6F2]
                  rounded-2xl
                  p-6
                "
              >
                <p className="text-sm text-gray-500">
                  Delivery
                </p>

                <p className="mt-2 font-medium">
                  5 - 7 Business Days
                </p>
              </div>
            </div>

            {/* Buttons */}

            <div
              className="
                mt-12
                grid md:grid-cols-2 
                gap-4
                justify-center
              "
            >
              <Link
                href="/collections"
                className="
                  min-w-[220px]
                  px-8
                  py-4
                  rounded-xl
                  bg-[#B8860B]
                  text-white
                  font-medium
                  text-center
                  hover:bg-[#A87908]
                  transition
                "
              >
                Continue Shopping
              </Link>

              <Link
                href="/orders"
                className="
                  min-w-[220px]
                  px-8
                  py-4
                  rounded-xl
                  border
                  border-[#B8860B]
                  text-[#B8860B]
                  font-medium
                  text-center
                  hover:bg-[#B8860B]
                  hover:text-white
                  transition
                "
              >
                View Orders
              </Link>
            </div>

            {/* Footer Note */}

            <div
              className="
                mt-14
                pt-10
                border-t
                border-[#E7E0D4]
              "
            >
              <p
                className="
                  text-gray-500
                  max-w-2xl
                  mx-auto
                  leading-7
                "
              >
                A confirmation email and complete
                order details will be available in
                your account once the order
                management system is connected.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}