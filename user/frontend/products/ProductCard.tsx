// user/frontend/products/ProductCard.tsx

interface ProductCardProps {
  name: string;
  price: number;
  image?: string;
}

export default function ProductCard({
  name,
  price,
}: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="aspect-square bg-gray-100" />

      <div className="p-4">
        <h3 className="font-medium">{name}</h3>

        <p className="mt-2 text-[#B8860B]">
          ₹{price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}