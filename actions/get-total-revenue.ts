import { db } from "@/libs/db";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await db.purchase.findMany({
    where: {
      storeId,
    },
    include: {
      product: true
    }
  });

  const purchases = await db.purchase.findMany({
    where: {
      storeId
    }
  });

  const totalSales = purchases.reduce((total, purchase) => {
    const product = paidOrders.find((product) => product.id === purchase.productId);
    const price = product?.product.productPrice || 0;
    
    /// @ts-ignore
    return total + price;
  }, 0); 
};