import CategoryForm from "@/admin/frontend/categories/CategoryForm";

export default function NewCategoryPage() {
  return (
    <main className="space-y-8">
      <div>
        <p
          className="
            uppercase
            tracking-[6px]
            text-[#B8860B]
          "
        >
          Signature Admin
        </p>

        <h1 className="text-5xl font-bold">
          Add Category
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new category.
        </p>
      </div>

      <CategoryForm />
    </main>
  );
}