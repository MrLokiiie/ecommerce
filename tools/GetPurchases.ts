import { Purchase } from "@prisma/client";

import { db } from "@/libs/db";

export async function GetPurchases(storeId: string): Promise<Purchase[]> {
  const purchases = await db.purchase?.findMany({
    where: {
      storeId
    }
  });

  return purchases;
}