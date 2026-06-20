type Props = {
  stats: {
    totalProducts: number;
    totalStockUnits: number;
    lowStockProducts: number;
    outOfStockProducts: number;
  };
};

export default function InventoryStats({
  stats,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Total Products
        </p>

        <h3 className="mt-3 text-3xl font-bold text-gray-900">
          {stats.totalProducts}
        </h3>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          Total Stock Units
        </p>

        <h3 className="mt-3 text-3xl font-bold text-gray-900">
          {stats.totalStockUnits}
        </h3>
      </div>

      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 shadow-sm">
        <p className="text-sm font-medium text-yellow-700">
          Low Stock Products
        </p>

        <h3 className="mt-3 text-3xl font-bold text-yellow-700">
          {stats.lowStockProducts}
        </h3>
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <p className="text-sm font-medium text-red-700">
          Out Of Stock
        </p>

        <h3 className="mt-3 text-3xl font-bold text-red-700">
          {stats.outOfStockProducts}
        </h3>
      </div>
    </div>
  );
}