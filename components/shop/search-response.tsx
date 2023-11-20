"use client";

interface SearchResponseInterface {
  products: Product[];
};

import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "@prisma/client";
import { CreditCard, DollarSign, ShoppingBagIcon, ViewIcon } from "lucide-react";

import { 
  Card, 
  CardDescription, 
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export const SearchResponse: React.FC<SearchResponseInterface> = ({ products }) => {
  const router = useRouter();

  const redriectToPurchasePage = (productId: string) => {
    router.push(`/shop/purchase/${productId}`);
  }

  return (
    <div className="flex items-center flex-row col-span-auto">
      {products.map((product) => (
        <Card className="m-3 h-auto w-48 p-4">
          <CardTitle>
            <span className="text-lg">{product.productName}</span>
          </CardTitle>
          <CardDescription className="flex items-center">
            <DollarSign className="h-4 w-4 mr-4" /> {product.productPrice}
          </CardDescription>
          <Separator className="mt-3 mb-3" />
          <div className="flex items-center flex-col space-y-4 gap-x-2">
            <Button className="w-full" onClick={() => redriectToPurchasePage(product.id)}>
              Purchase <CreditCard className="ml-2 h-5 w-5" /> 
            </Button>
            <Button className="w-full">
              Add to Cart <ShoppingBagIcon className="ml-2 h-5 w-5" />
            </Button>
            <Button className="w-full" onClick={() => router.push(`/shop/product/${product.id}`)}>
              See Product <ViewIcon className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
