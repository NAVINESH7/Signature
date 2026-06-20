const orders = [
  {
    id: "#1001",
    customer: "Priya Sharma",
    total: "₹18,500",
    status: "Delivered",
  },
  {
    id: "#1002",
    customer: "Ananya Rao",
    total: "₹24,000",
    status: "Processing",
  },
  {
    id: "#1003",
    customer: "Meera Nair",
    total: "₹12,800",
    status: "Delivered",
  },
  {
    id: "#1004",
    customer: "Lakshmi Devi",
    total: "₹32,500",
    status: "Pending",
  },
];

export default function RecentOrders() {
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <p
            className="
              uppercase
              tracking-[5px]
              text-[#B8860B]
              text-xs
              mb-2
            "
          >
            Orders
          </p>

          <h2 className="text-3xl font-bold text-[#111111]">
            Recent Orders
          </h2>
        </div>

        <button
          className="
            rounded-xl
            bg-[#F6F1E8]
            px-4
            py-2
            text-sm
            font-medium
            text-[#B8860B]
          "
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="
              rounded-2xl
              border
              border-[#F1ECE2]
              p-5
              transition-all
              hover:border-[#D4AF37]
              hover:shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <h3
                  className="
                    text-base
                    font-semibold
                    text-[#111111]
                  "
                >
                  {order.customer}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Order {order.id}
                </p>
              </div>

              <div className="text-right">
                <h4
                  className="
                    text-lg
                    font-bold
                    text-[#111111]
                  "
                >
                  {order.total}
                </h4>

                <span
                  className="
                    inline-flex
                    mt-2
                    rounded-full
                    bg-[#F6F1E8]
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-[#B8860B]
                  "
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="
          mt-8
          rounded-2xl
          bg-[#FAF8F3]
          p-5
        "
      >
        <p className="text-sm text-gray-500">
          Today's Sales
        </p>

        <h3
          className="
            mt-2
            text-3xl
            font-bold
            text-[#111111]
          "
        >
          ₹87,500
        </h3>
      </div>
    </section>
  );
}