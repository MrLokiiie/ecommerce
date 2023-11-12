import { db } from "@/libs/db"

export const getProductRevenue = async (storeId?: string, productId?: string): Promise<number> => {
  const paidOrders = await db.purchase.findFirst({
    where: {
      storeId,
      productId,
    },
    include: {
      product: true
    }
  });

  const purchases = await db.purchase.findMany({
    where: {
      storeId,
      productId
    },
    include: {
      product: true
    }
  });

  const totalSales = purchases.reduce((total, purchase) => {
    const price = purchase.product.productPrice || 0;
    
    return total + price;
  }, 0);

  return totalSales;
}