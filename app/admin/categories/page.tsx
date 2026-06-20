import CategoriesTable from "@/admin/frontend/tables/CategoriesTable";
import { getCategories } from "@/admin/backend/categories/getCategories";

export default async function CategoriesPage() {
  const categories =
    await getCategories();

  return (
    <main className="space-y-8">
      <div>
        <p className="mb-2 uppercase tracking-[4px] text-[#B8860B]">
          Signature Admin
        </p>

        <h1 className="text-4xl font-bold text-neutral-900">
          Categories Management
        </h1>

        <p className="mt-2 text-neutral-600">
          Manage silk saree categories and collections.
        </p>
      </div>

      <CategoriesTable
        categories={categories}
      />
    </main>
  );
}