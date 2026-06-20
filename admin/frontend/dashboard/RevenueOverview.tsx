interface RevenueOverviewProps {
  revenue: number;
}

export default function RevenueOverview({
  revenue,
}: RevenueOverviewProps) {
  return (
    <section
      className="
        rounded-[36px]
        border
        border-[#E7E0D4]
        bg-white
        p-10
        shadow-[0_10px_30px_rgba(0,0,0,0.04)]
      "
    >
      <p
        className="
          uppercase
          tracking-[5px]
          text-[#B8860B]
          text-xs
          mb-3
        "
      >
        Revenue Overview
      </p>

      <h2
        className="
          text-6xl
          font-bold
          text-[#111111]
        "
      >
        ₹{revenue.toLocaleString()}
      </h2>

      <p className="mt-4 text-gray-500">
        Total revenue generated from completed orders.
      </p>
    </section>
  );
}