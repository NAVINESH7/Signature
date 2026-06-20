"use client";

import { useState } from "react";

interface AddressFormProps {
  initialValues?: any;

  onSubmit: (
    values: any
  ) => Promise<void>;
}

export default function AddressForm({
  initialValues,
  onSubmit,
}: AddressFormProps) {
  const [form, setForm] =
    useState({
      label:
        initialValues?.label ??
        "Home",

      full_name:
        initialValues?.full_name ??
        "",

      phone:
        initialValues?.phone ??
        "",

      address_line_1:
        initialValues?.address_line_1 ??
        "",

      address_line_2:
        initialValues?.address_line_2 ??
        "",

      city:
        initialValues?.city ?? "",

      state:
        initialValues?.state ??
        "",

      postal_code:
        initialValues?.postal_code ??
        "",

      country:
        initialValues?.country ??
        "India",

      is_default:
        initialValues?.is_default ??
        false,
    });

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();

        await onSubmit(form);
      }}
    >
      <input
        className="w-full border p-2 rounded"
        placeholder="Label"
        value={form.label}
        onChange={(e) =>
          setForm({
            ...form,
            label:
              e.target.value,
          })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e) =>
          setForm({
            ...form,
            full_name:
              e.target.value,
          })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) =>
          setForm({
            ...form,
            phone:
              e.target.value,
          })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Address Line 1"
        value={
          form.address_line_1
        }
        onChange={(e) =>
          setForm({
            ...form,
            address_line_1:
              e.target.value,
          })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Address Line 2"
        value={
          form.address_line_2
        }
        onChange={(e) =>
          setForm({
            ...form,
            address_line_2:
              e.target.value,
          })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="City"
        value={form.city}
        onChange={(e) =>
          setForm({
            ...form,
            city:
              e.target.value,
          })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="State"
        value={form.state}
        onChange={(e) =>
          setForm({
            ...form,
            state:
              e.target.value,
          })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Postal Code"
        value={
          form.postal_code
        }
        onChange={(e) =>
          setForm({
            ...form,
            postal_code:
              e.target.value,
          })
        }
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Country"
        value={form.country}
        onChange={(e) =>
          setForm({
            ...form,
            country:
              e.target.value,
          })
        }
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={
            form.is_default
          }
          onChange={(e) =>
            setForm({
              ...form,
              is_default:
                e.target.checked,
            })
          }
        />

        Set as default
      </label>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save Address
      </button>
    </form>
  );
}