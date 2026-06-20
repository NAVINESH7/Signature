import AdminSidebar from "../layouts/AdminSidebar";
import AdminHeader from "../layouts/AdminHeader";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F8F6F2]">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}