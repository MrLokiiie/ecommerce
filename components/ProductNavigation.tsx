"use client";

import { Settings, Trash2Icon } from "lucide-react";
import { Account, Product } from "@prisma/client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useProductModal } from "@/hooks/useProductModal";
import { useDeleteProduct } from "@/hooks/deleteProductAlert";
import Link from "next/link";

interface ProductNavigationProps {
  currentUser: Account;
  product: Product;
  storeId: string;
}

export const ProductNavigation: React.FC<ProductNavigationProps> = ({
  storeId,
  product,
  currentUser
}) => {
  const productModal = useProductModal();
  const router = useRouter();
  const deleteProduct = useDeleteProduct();

  console.log(product.productName)

  return (
    <>
      <div>
        <div className="flex items-center ml-4">
          <span className="text-muted-foreground text-sm text-center">{product.productName}</span>
          <Button 
            className="ml-8" 
            variant="outline"
          >
            <Link
              href={`/dashboard/store/${product.storeId}/products/${product.id}/api`}
            >
              View API
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex items-center ml-auto">
        <div className="mr-4">
          <Button
            type="button"
            id="delete-button-element"
            variant="destructive"
            size="icon"
            onClick={deleteProduct.onOpen}
          >
            <Trash2Icon />
          </Button>
        </div>
        <Button
          type="button" 
          variant="outline" 
          className="rounded-full bg-primary-foreground hover:text-emerald-300" 
          size="icon"
          onClick={productModal.onOpen}
        >
          <Settings />
        </Button>
      </div>
    </>
  )
}