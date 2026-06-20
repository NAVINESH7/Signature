"use client";

interface AddressSelectorProps {
  addresses: any[];

  selectedAddressId: string;

  onSelect: (
    addressId: string
  ) => void;

  onEdit: (
    address: any
  ) => void;

  onAdd: () => void;
}

export default function AddressSelector({
  addresses,
  selectedAddressId,
  onSelect,
  onEdit,
  onAdd,
}: AddressSelectorProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2
          className="
            font-luxury
            text-3xl
          "
        >
          Select Address
        </h2>
      </div>

      <div className="space-y-4">
        {addresses.map(
          (address) => (
            <div
              key={address.id}
              className={`
                border
                rounded-2xl
                p-6
                transition
                ${
                  selectedAddressId ===
                  address.id
                    ? "border-[#B8860B] bg-[#FFFDF8]"
                    : "border-[#E7E0D4]"
                }
              `}
            >
              <div className="flex justify-between items-start">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() =>
                    onSelect(
                      address.id
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-lg">
                      {
                        address.label
                      }
                    </h3>

                    {address.is_default && (
                      <span
                        className="
                          text-xs
                          bg-[#B8860B]
                          text-white
                          px-2
                          py-1
                          rounded
                        "
                      >
                        Default
                      </span>
                    )}
                  </div>

                  <p className="mt-3">
                    {
                      address.full_name
                    }
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
                    {
                      address.state
                    }
                  </p>

                  <p>
                    {
                      address.postal_code
                    }
                  </p>

                  <p>
                    {
                      address.country
                    }
                  </p>
                </div>

                <button
                  onClick={() =>
                    onEdit(
                      address
                    )
                  }
                  className="
                    text-[#B8860B]
                    font-medium
                  "
                >
                  Edit
                </button>
              </div>
            </div>
          )
        )}

        <button
          onClick={onAdd}
          className="
            w-full
            border-2
            border-dashed
            border-[#B8860B]
            rounded-2xl
            p-6
            text-center
            text-[#B8860B]
            font-medium
          "
        >
          + Add Address
        </button>
      </div>
    </div>
  );
}