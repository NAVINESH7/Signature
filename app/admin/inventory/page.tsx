import { getInventory } from "@/admin/backend/inventory/getInventory";
import { getInventoryStats } from "@/admin/backend/inventory/inventoryStats";

import InventoryStats from "@/admin/frontend/inventory/InventoryStats";
import InventoryAlerts from "@/admin/frontend/inventory/InventoryAlerts";
import InventoryManager from "@/admin/frontend/inventory/InventoryManager";

export default async function InventoryPage() {
  const [products, stats] = await Promise.all([
    getInventory(),
    getInventoryStats(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Inventory Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Monitor stock levels and update inventory quickly.
        </p>
      </div>

      {/* Stats */}
      <InventoryStats stats={stats} />

      {/* Alerts */}
      <InventoryAlerts
        lowStock={stats.lowStockProducts}
        outOfStock={stats.outOfStockProducts}
      />

      {/* Search + Filters + Table */}
      <InventoryManager
        products={products}
      />
    </div>
  );
}