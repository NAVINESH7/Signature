interface Props {
  status:
    | "out_of_stock"
    | "low_stock"
    | "medium_stock"
    | "healthy_stock";
}

export default function StatusBadge({
  status,
}: Props) {
  const statusConfig = {
    out_of_stock: {
      label: "Out Of Stock",
      className:
        "bg-red-100 text-red-700 border border-red-200",
    },

    low_stock: {
      label: "Low Stock",
      className:
        "bg-yellow-100 text-yellow-700 border border-yellow-200",
    },

    medium_stock: {
      label: "Medium Stock",
      className:
        "bg-blue-100 text-blue-700 border border-blue-200",
    },

    healthy_stock: {
      label: "Healthy Stock",
      className:
        "bg-green-100 text-green-700 border border-green-200",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
}