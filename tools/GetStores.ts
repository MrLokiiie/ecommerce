import { Store } from "@prisma/client";

import { db } from "@/libs/db";
import { getCurrentUser } from "@/tools/CurrentUser";

type StoresType = {
  id: string;
  ownerId: string;
  storeName: string;
  storeDescription: string;
  isPublic: boolean;
}

export async function GetStores(): Promise<Store> {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    return {
      id: '',
      ownerId: "",
      isPublic: false,
      storeName: "",
      storeDescription: ""
    } as StoresType;
  }

  const check = await db.store.count({
    where: {
      ownerId: currentUser.id
    }
  });

  if (check < 1) {
    return {
      id: '',
      ownerId: "",
      isPublic: false,
      storeName: "",
      storeDescription: ""
    } as StoresType;
  } else {
    const userCreatedStores = await db.store.findFirst({
      where: {
        ownerId: currentUser.id,
      }
    });
  
    return userCreatedStores as StoresType;
  }
}