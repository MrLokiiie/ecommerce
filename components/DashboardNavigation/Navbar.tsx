"use client";

import { Account, Product, Store } from "@prisma/client";

import { useCreateStore } from "@/hooks/useCreateStoreModal";

import { UserButton } from "@/components/UserButton";
import { MainNav } from "@/components/DashboardNavigation/MainNav";
import { Button } from "@/components/ui/button";

export type Routes<
    Url extends any, 
    Href extends any, 
    Label extends any,
    IsActive extends any,
  >  = {
  url: Url;
  href: Href;
  label: Label;
  isActive: IsActive
};

interface NavbarProps {
  currentUser: Account;
  routes?: Routes<string, string, string, boolean>[];
  stores: Store;
  product: Product[];
}

export const Navbar = ({
  currentUser,
  stores,
  product,
  routes
}: NavbarProps) => {
  const storeModal = useCreateStore();

  return (
    <div className="border-b top-0 sticky">
      <div className="flex h-16 items-center px-4 bg-gray-100">
        {/* <StoreSwitcher items={stores} /> */}
        <MainNav currentUser={currentUser} stores={stores} className="mx-6" />
        {/* <SelectProduct product={product} /> */}
        {/* <DashboardUnderbar stores={stores} currentUser={currentUser} /> */}
        <div className="ml-auto flex items-center space-x-4 gap-x-2">
          {/* <ThemeToggle /> */}
          {/* <UserButton afterSignOutUrl="/" /> */}
          <div>
            <Button onClick={storeModal.onOpen}>Create Store</Button>
          </div>
          <UserButton currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}
