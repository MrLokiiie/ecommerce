import { Navbar } from "@/components/DashboardNavigation/Navbar";
import { ProductModal } from "@/components/ProductModal";
import { CreateStoreModal } from "@/components/modals/CreateStoreModal";

import { getCurrentUser } from "@/tools/CurrentUser";

import { GetProducts } from "@/tools/GetProduct";
import { GetStores } from "@/tools/GetStores";

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {
    storeId: string;
  }
}) {
  const currentUser = await getCurrentUser();
  const stores = await GetStores();
  const product = await GetProducts(params.storeId);
  
  return (
    <div>
      <Navbar currentUser={currentUser} product={product} stores={stores} />
      <CreateStoreModal stores={stores} />
      <main>
        {children}
      </main>
    </div>
  )
}