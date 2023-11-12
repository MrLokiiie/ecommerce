import { GetProductsByStoreId } from "@/tools/GetProducts";
import { StoreNavigation } from "@/components/StoreNavigation";
import { GetPurchases } from "@/tools/GetPurchases";

import { CreateProductModal } from "@/components/modals/CreateProduct";

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

  return (
    <div>
      <StoreNavigation 
        products={products} 
        storeId={params.storeId} 
        purchases={purchases} 
      />
      <CreateProductModal storeId={params.storeId} />
    </div>
  );
}

export default StorePage;