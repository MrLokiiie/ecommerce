import { redis } from "@/libs/redis";
import { db } from "@/libs/db";

type CartStorage = {
  cartStorageId: string;
  userId: string;
  productId: string;
  productName: string;
  productPrice: number;
}

interface CartFuncationality {
  set: (itemName: string, itemPrice: number) => void;
  delete: (itemName: string, cartStorageId: string) => void;
  get: (cartStorageId: string) => void;
  getAll: (userId: string) => void;
};

// TODO: Finish the Cart Functionality.
export const CartFunctionality: CartFuncationality = {
  set(itemName, itemPrice) {
    
  },
  delete(itemName, cartStorageId) {
    
  },
  get(cartStorageId) {
    const cartStorage: CartStorage = {
      cartStorageId: "",
      productId: "unique",
      userId: "unique",
      productName: "unique",
      productPrice: 55,
    }
  },
  async getAll(userId) {
    console.log(userId);

    const cartStorage: CartStorage[] = [
      {
        cartStorageId: "unique",
        productId: "unique",
        userId: "unique",
        productName: "unique",
        productPrice: 55,
      }
    ];

    return cartStorage;
  },
}
