interface Props {
  price: string;
  setPrice: (
    value: string
  ) => void;

  comparePrice: string;
  setComparePrice: (
    value: string
  ) => void;

  stock: string;
  setStock: (
    value: string
  ) => void;
}

export default function ProductPricingCard({
  price,
  setPrice,
  comparePrice,
  setComparePrice,
  stock,
  setStock,
}: Props) {
  return (
    <div
      className="
        bg-white
        border
        border-[#E7E0D4]
        rounded-[32px]
        p-8
      "
    >
      <h2
        className="
          text-2xl
          font-semibold
          mb-8
        "
      >
        Pricing & Inventory
      </h2>

      <div className="grid md:grid-cols-3 gap-5">

        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
          placeholder="Price"
          className="
            p-4
            rounded-2xl
            border
            border-[#E7E0D4]
          "
        />

        <input
          type="number"
          value={comparePrice}
          onChange={(e) =>
            setComparePrice(
              e.target.value
            )
          }
          placeholder="Sale Price"
          className="
            p-4
            rounded-2xl
            border
            border-[#E7E0D4]
          "
        />

        <input
          type="number"
          value={stock}
          onChange={(e) =>
            setStock(
              e.target.value
            )
          }
          placeholder="Stock"
          className="
            p-4
            rounded-2xl
            border
            border-[#E7E0D4]
          "
        />

      </div>
    </div>
  );
}