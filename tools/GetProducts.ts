import { db } from "@/libs/db";

import { Product } from "@prisma/client";

interface ProductsProps {
  storeId: string;
}

export async function GetProductById(/*** Product Id */ id: string): Promise<Product> {
  const product = await db.product.findUnique({
    where: {
      id
    }
  });
  
  return product as Product;
}

export async function GetProductByIdNew(
  /**
   * Product Id
   */
  id: string,
  /**
   * Store Id
   */
  storeId: string
): Promise<Product> {
  const product = await db.product.findUnique({
    where: {
      id,
      storeId
    }
  });

  return product as Product;
}

export async function GetProductsByStoreId({
  storeId
}: ProductsProps): Promise<Product[]> {
  const storeProducts = await db.product.findMany({
    where: {
      storeId
    }
  });
  
  return storeProducts;
}