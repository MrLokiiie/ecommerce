"use client";

import Link from "next/link";

import { Product, Purchase } from "@prisma/client";

import { useCreateProduct } from "@/hooks/useCreateProduct";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface StoreNavigationProps {
  products: Product[];
  purchases: Purchase[];
  storeId: string;
}

export const StoreNavigation = ({
  products,
  purchases,
  storeId,
}: StoreNavigationProps) => {
  const createProduct = useCreateProduct();

  const totalSales = purchases?.reduce((total, purchase) => {
    const product = products?.find((product) => product.id === purchase.productId);
    const price = product?.productPrice || 0;
    
    /// @ts-ignore
    return total + price;
  }, 0); 

  return (
    <div>
      {!products && (
        <div className="flex flex-col items-center justify-center h-screen space-y-4 border">
          <span className="text-muted-foreground space-y-4 text-sm">
            No products found.
          </span>
        </div>
      )}
      <div className="fixed bottom-0 flex flex-row items-center p-4 border w-full">
        <div id="sales">
          Sales: {products && totalSales}
        </div>
        <div id="products" className="ml-[20px]">
          <DropdownMenu>
            <DropdownMenuTrigger>Select Product</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Choose a Product</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {products.map((product) => (
                <div>
                  <DropdownMenuItem>
                    <Link 
                      href={`/dashboard/store/${storeId}/products/${product.id}`}
                    >
                      {product.productName}
                    </Link>
                  </DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="ml-auto">
          <Button className="rounded-lg hover:bg-secondary hover:text-primary" onClick={createProduct.onOpen}>Create a Product</Button>
        </div>
      </div>
    </div>
  )
}
