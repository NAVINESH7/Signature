import Image from "next/image";

import StatusBadge from "./StatusBadge";
import QuickStockEdit from "./QuickStockEdit";

type Product = {
  id: string;
  name: string;
  stock: number;
  price: number;
  cover_image: string | null;
  status:
    | "out_of_stock"
    | "low_stock"
    | "medium_stock"
    | "healthy_stock";
};

interface Props {
  products: Product[];
}

export default function InventoryTable({
  products,
}: Props) {
  if (!products.length) {
    return (
      <div className="rounded-xl border bg-white p-12 text-center">
        <h3 className="text-lg font-semibold">
          No Products Found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Add products to start managing inventory.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Product
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Stock
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Quick Update
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                {/* Product */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg border bg-gray-100">
                      {product.cover_image ? (
                        <Image
                          src={product.cover_image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900">
                        {product.name}
                      </h4>

                      <p className="text-sm text-gray-500">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Stock */}
                <td className="px-6 py-4">
                  <span className="font-semibold">
                    {product.stock}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <StatusBadge
                    status={product.status}
                  />
                </td>

                {/* Quick Edit */}
                <td className="px-6 py-4">
                  <QuickStockEdit
                    productId={product.id}
                    currentStock={product.stock}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}