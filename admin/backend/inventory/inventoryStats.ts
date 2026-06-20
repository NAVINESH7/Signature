import { getInventory } from "./getInventory";

export async function getInventoryStats() {
  const products = await getInventory();

  const totalProducts = products.length;

  const totalStockUnits = products.reduce(
    (sum: number, product) => sum + product.stock,
    0
  );

  const lowStockProducts = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <= 5
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  ).length;

  return {
    totalProducts,
    totalStockUnits,
    lowStockProducts,
    outOfStockProducts,
  };
}