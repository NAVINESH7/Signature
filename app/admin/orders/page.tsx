import { getOrders } from "@/user/backend/orders/getOrders";
import OrdersTable from "@/admin/frontend/orders/OrdersTable";

export default async function AdminOrdersPage() {
  const orders =
    await getOrders();

  return (
    <OrdersTable
      orders={orders}
    />
  );
}