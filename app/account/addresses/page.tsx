"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/user/frontend/context/AuthContext";

import {
getAddresses,
createAddress,
deleteAddress,
setDefaultAddress,
} from "@/lib/addresses";

import AddressForm from "./AddressForm";

export default function AddressesPage() {
const { user } = useAuth();

const router = useRouter();

const [loading, setLoading] =
useState(true);

const [showForm, setShowForm] =
useState(false);

const [addresses, setAddresses] =
useState<any[]>([]);

useEffect(() => {
if (user?.id) {
loadAddresses();
}
}, [user]);

async function loadAddresses() {
try {
if (!user?.id) return;


  const data =
    await getAddresses(user.id);

  setAddresses(data || []);
} catch (error) {
  console.error(error);
} finally {
  setLoading(false);
}


}

async function handleCreateAddress(
values: any
) {
try {
await createAddress({
profile_id: user.id,
...values,
});


  setShowForm(false);

  await loadAddresses();
} catch (error) {
  console.error(error);
}


}

async function handleDelete(
addressId: string
) {
try {
await deleteAddress(addressId);


  await loadAddresses();
} catch (error) {
  console.error(error);
}


}

async function handleSetDefault(
addressId: string
) {
try {
await setDefaultAddress(
user.id,
addressId
);

  await loadAddresses();
} catch (error) {
  console.error(error);
}


}

if (loading) {
return ( <div className="max-w-6xl mx-auto p-8">
Loading... </div>
);
}

return ( <div className="max-w-6xl mx-auto p-8"> <div className="flex items-center justify-between mb-8"> <div> <h1 className="text-3xl font-bold">
My Addresses </h1>

      <p className="text-gray-500 mt-2">
        Manage delivery addresses
      </p>
    </div>

    <button
      onClick={() =>
        setShowForm(true)
      }
      className="px-4 py-2 rounded bg-black text-white"
    >
      Add Address
    </button>
  </div>

  {showForm && (
    <div className="border rounded-xl p-6 mb-6">
      <AddressForm
        onSubmit={
          handleCreateAddress
        }
      />
    </div>
  )}

  {addresses.length === 0 ? (
    <div className="border rounded-xl p-6">
      No addresses found.
    </div>
  ) : (
    <div className="grid md:grid-cols-2 gap-6">
      {addresses.map(
        (address) => (
          <div
            key={address.id}
            className="border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">
                  {address.label}
                </h3>

                {address.is_default && (
                  <span className="text-xs px-2 py-1 bg-black text-white rounded">
                    Default
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <p>
                {address.full_name}
              </p>

              <p>
                {address.phone}
              </p>

              <p>
                {
                  address.address_line_1
                }
              </p>

              {address.address_line_2 && (
                <p>
                  {
                    address.address_line_2
                  }
                </p>
              )}

              <p>
                {address.city},{" "}
                {address.state}
              </p>

              <p>
                {
                  address.postal_code
                }
              </p>

              <p>
                {address.country}
              </p>
            </div>

<div className="flex gap-2 mt-6">
  {!address.is_default && (
    <button
      onClick={() =>
        handleSetDefault(
          address.id
        )
      }
      className="px-3 py-2 border rounded"
    >
      Set Default
    </button>
  )}

  <button
    onClick={() =>
      router.push(
        `/account/addresses/edit/${address.id}`
      )
    }
    className="px-3 py-2 border rounded"
  >
    Edit
  </button>

  <button
    onClick={() =>
      handleDelete(
        address.id
      )
    }
    className="px-3 py-2 border rounded"
  >
    Delete
  </button>
</div>
          </div>
        )
      )}
    </div>
  )}
</div>


);
}
