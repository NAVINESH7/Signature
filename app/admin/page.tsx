import DashboardStats from "@/admin/frontend/dashboard/DashboardStats";
import { getDashboardData } from "@/admin/backend/dashboard/getDashboardData";

export default async function AdminDashboardPage() {
  const dashboard = await getDashboardData();

  return (
    <main className="space-y-8">
      <div>
        <p
          className="
            uppercase
            tracking-[6px]
            text-[#B8860B]
            mb-3
          "
        >
          Signature Admin
        </p>

        <h1
          className="
            text-5xl
            font-bold
            text-[#111111]
          "
        >
          Dashboard
        </h1>

        <p className="mt-3 text-lg text-gray-600">
          Welcome back to your luxury silk saree administration.
        </p>
      </div>

      <DashboardStats
        revenue={dashboard.revenue}
        totalOrders={dashboard.totalOrders}
        pendingOrders={dashboard.pendingOrders}
        totalCustomers={dashboard.totalCustomers}
        totalProducts={dashboard.totalProducts}
        lowStock={dashboard.lowStock}
      />
    </main>
  );
}