import { db } from "@/libs/db"

export const getProductSalesCount = async (storeId: string, productId: string): Promise<number> => {
  const salesCount = await db.purchase.count({
    where: {
      productId,
      storeId
    }
  });

  return salesCount;
}