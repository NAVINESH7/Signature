import Navbar from "@/user/frontend/components/Navbar";

export default function ProfileOrdersPage() {
  return (
    <main className="min-h-screen bg-[#F8F6F2]">
      <Navbar />

      <section className="py-12">
        <div className="luxury-container">
          <h1 className="font-luxury text-6xl">
            My Orders
          </h1>

          <p className="mt-3 text-gray-500">
            Orders page coming soon.
          </p>
        </div>
      </section>
    </main>
  );
}