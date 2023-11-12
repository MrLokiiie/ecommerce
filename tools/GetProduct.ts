import { Product } from "@prisma/client";

import { db } from "@/libs/db";
import { getCurrentUser } from "@/tools/CurrentUser";

type Product_ = {
  id: string;
  storeId: string;
  productName: string;
  productPrice: number;
  isHidden: boolean | null
}

export async function GetProducts(storeId: string): Promise<Product[]> {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    /// @ts-ignore
    return [
      {
        id: '',
        storeId: '',
        productPrice: 0,
        isHidden: null,
        productName: '',
      }
    ] as Product_[];
  }

  const check = await db.store.count({
    where: {
      ownerId: currentUser.id
    }
  });

  if (check < 1) {
    /// @ts-ignore
    return [
      {
        id: '',
        storeId: '',
        productPrice: 0,
        isHidden: null,
        productName: '',
      }
    ] as Product_[];
  } else {
    const userCreatedStores = await db.product.findMany({
      where: {
        storeId: storeId
      }
    });
  
    return userCreatedStores;
  }
}