"use client";

import { Stores } from "@prisma/client";

import { useCreateStore } from "@/hooks/useCreateStoreModal";

interface OpenStoreModalProps {
  stores: Stores;
}

export const OpenStoreModal = ({
  stores
}: OpenStoreModalProps) => {
  const storeModal = useCreateStore();

  storeModal.isOpen = true;
  
  if (!stores) {
    return (
      <>
        {() => storeModal.onOpen}
      </>
    )
  }
}
