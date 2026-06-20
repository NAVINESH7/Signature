import StatCard from "@/admin/frontend/components/StatCard";

interface DashboardStatsProps {
  revenue: number;
  totalOrders: number;
  pendingOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStock: number;
}

export default function DashboardStats({
  revenue,
  totalOrders,
  pendingOrders,
  totalCustomers,
  totalProducts,
  lowStock,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <StatCard
        title="Total Revenue"
        value={`₹${revenue.toLocaleString()}`}
        subtitle="Overall sales"
      />

      <StatCard
        title="Total Orders"
        value={totalOrders}
        subtitle="All orders"
      />

      <StatCard
        title="Pending Orders"
        value={pendingOrders}
        subtitle="Need attention"
      />

      <StatCard
        title="Customers"
        value={totalCustomers}
        subtitle="Registered users"
      />

      <StatCard
        title="Products"
        value={totalProducts}
        subtitle="Active sarees"
      />

      <StatCard
        title="Low Stock"
        value={lowStock}
        subtitle="Products running low"
      />
    </div>
  );
}