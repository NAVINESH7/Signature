"use client";

import {
  use,
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import AddressForm from "../../AddressForm";

import { getAddress } from "@/user/backend/addresses/getAddress";
import { updateAddress } from "@/user/backend/addresses/updateAddress";

export default function EditAddressPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
const router = useRouter();

const searchParams =
  useSearchParams();

const returnTo =
  searchParams.get(
    "returnTo"
  );

  const { id } = use(params);

  const [loading, setLoading] =
    useState(true);

  const [address, setAddress] =
    useState<any>(null);

  useEffect(() => {
    loadAddress();
  }, [id]);

  async function loadAddress() {
    try {
      const data =
        await getAddress(id);

      setAddress(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(
    values: any
  ) {
    try {
      await updateAddress(
        id,
        values
      );

      router.push(
  returnTo ||
    "/account/addresses"
);


    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        Loading...
      </div>
    );
  }

  if (!address) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        Address not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Address
      </h1>

      <div className="border rounded-xl p-6">
        <AddressForm
          initialValues={address}
          onSubmit={handleUpdate}
        />
      </div>
    </div>
  );
}