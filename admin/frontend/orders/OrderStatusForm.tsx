"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  orderId: string;
  currentStatus: string;
}

export default function OrderStatusForm({
  orderId,
  currentStatus,
}: Props) {

  const router = useRouter();
  
  const [status, setStatus] =
    useState(currentStatus);

  const [loading, setLoading] =
    useState(false);

  const handleUpdate =
    async () => {
      try {
        setLoading(true);

        const response =
          await fetch(
            `/api/orders/${orderId}/status`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                status,
              }),
            }
          );

        if (!response.ok) {
          throw new Error(
            "Failed to update"
          );
        }

alert(
  "Order status updated"
);

router.push("/admin/orders");
router.refresh();
        
      } catch (error) {
        console.error(error);

        alert(
          "Failed to update status"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="flex gap-4">
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="
          border
          rounded-lg
          px-4
          py-2
        "
      >
        <option value="pending">
          Pending
        </option>

        <option value="confirmed">
          Confirmed
        </option>

        <option value="processing">
          Processing
        </option>

        <option value="shipped">
          Shipped
        </option>

        <option value="delivered">
          Delivered
        </option>

        <option value="cancelled">
          Cancelled
        </option>
      </select>

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="
          px-6
          py-2
          bg-black
          text-white
          rounded-lg
        "
      >
        {loading
          ? "Updating..."
          : "Update"}
      </button>
    </div>
  );
}