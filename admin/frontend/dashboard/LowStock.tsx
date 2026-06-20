const stock = [
  {
    name: "Pure Kanchipuram Bridal",
    left: 2,
  },
  {
    name: "Banarasi Gold Zari",
    left: 3,
  },
  {
    name: "Soft Silk Pink Edition",
    left: 4,
  },
  {
    name: "Royal Wedding Silk",
    left: 1,
  },
];

export default function LowStock() {
  return (
    <section
      className="
        rounded-[36px]
        border
        border-[#E7E0D4]
        bg-white
        p-8
        shadow-[0_10px_30px_rgba(0,0,0,0.04)]
      "
    >
      <div className="mb-8">
        <p
          className="
            uppercase
            tracking-[5px]
            text-[#B8860B]
            text-xs
            mb-2
          "
        >
          Inventory
        </p>

        <h2 className="text-3xl font-bold text-[#111111]">
          Low Stock Alerts
        </h2>

        <p className="mt-2 text-gray-500">
          Products that require immediate attention.
        </p>
      </div>

      <div className="space-y-4">
        {stock.map((item) => (
          <div
            key={item.name}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-[#F1ECE2]
              p-5
            "
          >
            <div>
              <h3 className="font-semibold text-[#111111]">
                {item.name}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Silk Saree Inventory
              </p>
            </div>

            <div
              className="
                rounded-full
                bg-red-50
                px-4
                py-2
                text-sm
                font-semibold
                text-red-600
              "
            >
              {item.left} Left
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}