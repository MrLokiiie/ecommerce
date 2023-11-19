import { db } from "@/libs/db";
import { Product } from "@prisma/client";

export async function GetStoreNameByProductId(id: string): Promise<string> {
  const product = await db.product.findUnique({
    where: {
      id
    },
    include: {
      store: true
    }
  });

  if (!product) {
    return "";
  }

  return product.store.storeName;
}

export async function GetProductById(id: string): Promise<Product> {
  const product = await db.product.findFirst({
    where: {
      id
    }
  });

  if (!product) {
    return {
      id: "",
      storeId: "",
      productName: "",
      productPrice: 0,
      isHidden: null,
      fileContent: "",
      fileName: ""
    }
  }

  return product;
}