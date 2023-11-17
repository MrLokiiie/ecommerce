import { Account, PersonalInformation, Store } from "@prisma/client";

import { GetProductsByStoreId } from "@/tools/GetProducts";
import { StoreNavigation } from "@/components/StoreNavigation";
import { GetPurchases } from "@/tools/GetPurchases";

import { CreateProductModal } from "@/components/modals/CreateProduct";
import { DeleteStore } from "@/components/store/delete-store";
import { getCurrentUser } from "@/tools/CurrentUser";

import { db } from "@/libs/db";
import { CreateInformation } from "@/components/create-information";

interface StoreProps {
  params: {
    storeId: string;
  }
}

const StorePage = async ({
  params
}: StoreProps) => {
  const currentUser = await getCurrentUser();

  const products = await GetProductsByStoreId({
    storeId: params.storeId
  });

  const purchases = await GetPurchases(params.storeId);

  const store = await db.store.findUnique({
    where: {
      id: params.storeId
    }
  });

  const personalInformation = await db.personalInformation.findUnique({
    where: {
      userId: currentUser?.id
    }
  });

  return (
    <div>
      <DeleteStore storeId={params.storeId} storeName={store?.storeName as string} />
      <StoreNavigation 
        products={products}
        personalInformation={personalInformation as PersonalInformation} 
        storeId={params.storeId}
        store={store as Store}
        purchases={purchases} 
      />
      <CreateInformation initalData={personalInformation as PersonalInformation} currentUser={currentUser as Account} />
      <CreateProductModal personalInformation={personalInformation as PersonalInformation} storeId={params.storeId} />
    </div>
  );
}

export default StorePage;