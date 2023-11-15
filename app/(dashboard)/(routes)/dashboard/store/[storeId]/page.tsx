import { Store } from "@prisma/client";

import { GetProductsByStoreId } from "@/tools/GetProducts";
import { StoreNavigation } from "@/components/StoreNavigation";
import { GetPurchases } from "@/tools/GetPurchases";

import { CreateProductModal } from "@/components/modals/CreateProduct";
import { DeleteStore } from "@/components/store/delete-store";

import { db } from "@/libs/db";

interface StoreProps {
  params: {
    storeId: string;
  }
}

const StorePage = async ({
  params
}: StoreProps) => {
  const products = await GetProductsByStoreId({
    storeId: params.storeId
  });

  const purchases = await GetPurchases(params.storeId);

  const store = await db.store.findUnique({
    where: {
      id: params.storeId
    }
  });

  return (
    <div>
      <DeleteStore storeId={params.storeId} storeName={store?.storeName as string} />
      <StoreNavigation 
        products={products} 
        storeId={params.storeId}
        store={store as Store}
        purchases={purchases} 
      />
      <CreateProductModal storeId={params.storeId} />
    </div>
  );
}

export default StorePage;