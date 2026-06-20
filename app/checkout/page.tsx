"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/user/frontend/context/AuthContext";
import Navbar from "@/user/frontend/components/Navbar";
import { getCart } from "@/user/backend/cart/cartStorage";
import { getAddresses } from "@/lib/addresses";
import AddressSelector from "./components/AddressSelector";
import type { CartItem } from "@/user/backend/cart/types";

interface Address {
  id: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default?: boolean;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
 

  useEffect(() => {
    setCart(getCart());
  }, []);

useEffect(() => {
  if (!user) return;

  loadAddresses();
}, [user]);

  async function loadAddresses() {
    if (!user?.id) return;

    try {
      const data = await getAddresses(user.id);
      setAddresses(data || []);

      const defaultAddress = data?.find((address: Address) => address.is_default);
if (defaultAddress) {
  setSelectedAddressId(
    defaultAddress.id
  );
} else if (
  data &&
  data.length > 0
) {
  setSelectedAddressId(
    data[0].id
  );
}
    } catch (error) {
      console.error(error);
    }
  }

  function handleSelectAddress(addressId: string) {
    setSelectedAddressId(addressId);
  }

  function handleEditAddress(
  address: Address
) {
  window.location.href =
    `/account/addresses/edit/${address.id}?returnTo=/checkout`;
}

function handleAddAddress() {
  window.location.href =
    "/account/addresses";
}




  const totalProducts = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    
   const selectedAddress =
  addresses.find(
    (address) =>
      address.id ===
      selectedAddressId
  ) || addresses[0]; 

    if (!selectedAddress) {
      alert("Please select an address");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const names = (selectedAddress.full_name || "").split(" ");
    const firstName = names[0] || "";
    const lastName = names.slice(1).join(" ");

    try {
      setLoading(true);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id || null,
          firstName,
          lastName,
          email: user?.email || "",
          phone: selectedAddress.phone,
          addressLine1: selectedAddress.address_line_1,
          addressLine2: selectedAddress.address_line_2,
          city: selectedAddress.city,
          state: selectedAddress.state,
          pincode: selectedAddress.postal_code,
          country: selectedAddress.country,
          cart,
        }),
      });

if (!response.ok) {
  const error =
    await response.json();

  console.error(error);

  alert(
    error.error ||
      "Failed to place order"
  );

  return;
}


const order =
  await response.json();

if (!order?.id) {
  alert(
    "Order created but order id is missing."
  );

  return;
}

localStorage.removeItem(
  "signature-cart"
);

window.dispatchEvent(
  new Event("cartUpdated")
);

window.location.href =
  `/checkout/success?id=${order.id}`;

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <Navbar />

      <section className="py-12">
        <div className="luxury-container">
          <div className="mb-12">
            <h1 className="font-luxury text-5xl md:text-7xl">Checkout</h1>
            <p className="mt-3 text-gray-500">Complete your order</p>
          </div>

          <div className="grid lg:grid-cols-[2fr_1fr] gap-10">
            {/* Left */}
            <div className="space-y-8">
              <div className="bg-white border border-[#E7E0D4] rounded-[24px] p-8">
<>
  {addresses.length === 0 ? (
    <div className="text-center py-12">
      <h3 className="text-xl font-medium mb-3">
        No Saved Addresses
      </h3>

      <p className="text-gray-500 mb-6">
        Add an address before
        placing an order.
      </p>

      <button
        onClick={handleAddAddress}
        className="
          bg-[#B8860B]
          text-white
          px-6
          py-3
          rounded-xl
        "
      >
        Add Address
      </button>
    </div>
  ) : (
    <AddressSelector
      addresses={addresses}
      selectedAddressId={
        selectedAddressId
      }
      onSelect={
        handleSelectAddress
      }
      onEdit={
        handleEditAddress
      }
      onAdd={
        handleAddAddress
      }
    />
  )}
</>
              </div>
            </div>

            {/* Right */}
            <div className="bg-white border border-[#E7E0D4] rounded-[24px] p-8 h-fit sticky top-28">
              <h2 className="font-luxury text-4xl mb-8">Order Summary</h2>

              <div className="space-y-5">
                <div className="flex justify-between">
                  <span>Products</span>
                  <span>{totalProducts}</span>
                </div>

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>

                <div className="border-t border-[#E7E0D4] pt-5 flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full mt-8 py-4 rounded-xl bg-[#B8860B] text-white font-medium hover:bg-[#A87908] transition"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}