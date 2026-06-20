"use client";

type Filter =
  | "all"
  | "out_of_stock"
  | "low_stock"
  | "medium_stock"
  | "healthy_stock";

interface Props {
  activeFilter: Filter;
  onChange: (filter: Filter) => void;
}

export default function InventoryFilters({
  activeFilter,
  onChange,
}: Props) {
  const filters: {
    label: string;
    value: Filter;
  }[] = [
    {
      label: "All Products",
      value: "all",
    },
    {
      label: "Out Of Stock",
      value: "out_of_stock",
    },
    {
      label: "Low Stock",
      value: "low_stock",
    },
    {
      label: "Medium Stock",
      value: "medium_stock",
    },
    {
      label: "Healthy Stock",
      value: "healthy_stock",
    },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() =>
            onChange(filter.value)
          }
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
            activeFilter === filter.value
              ? "bg-black text-white"
              : "bg-white hover:bg-gray-50"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}