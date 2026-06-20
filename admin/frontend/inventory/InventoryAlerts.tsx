interface Props {
  lowStock: number;
  outOfStock: number;
}

export default function InventoryAlerts({
  lowStock,
  outOfStock,
}: Props) {
  if (
    lowStock === 0 &&
    outOfStock === 0
  ) {
    return null;
  }

  return (
    <div className="space-y-3">
      {outOfStock > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          🚫 {outOfStock} product
          {outOfStock > 1 ? "s are" : " is"}{" "}
          out of stock
        </div>
      )}

      {lowStock > 0 && (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-yellow-700">
          ⚠ {lowStock} product
          {lowStock > 1 ? "s are" : " is"}{" "}
          low in stock
        </div>
      )}
    </div>
  );
}