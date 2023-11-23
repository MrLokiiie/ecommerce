import Link from "next/link";
import { Product } from "@prisma/client";
import { BrainCircuit } from "lucide-react";

import { ApiList } from "@/components/api-list";
import { Separator } from "@/components/ui/separator";
import { db } from "@/libs/db";
import { getCurrentUser } from "@/tools/CurrentUser";
import { Button } from "@/components/ui/button";
import { CustomApiForm } from "./_components/custom-api-form";

interface IParams {
  params: {
    storeId: string;
    productId: string;
  };
};

const ProductApiPage: React.FC<IParams> = async ({ params }) => {
  const currentUser = await getCurrentUser();
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
      storeId: params.storeId
    }
  });

  const isPro = await db.product.findFirst({
    where: {
      id: currentUser?.id
    }
  });

  const customApi = await db.customProductApi.findMany({
    where: {
      productId: params.storeId
    }
  });

  return (
    <div>
      <div className="p-4 space-y-4 gap-x-3">
        <ApiList 
          storeId={params.storeId} 
          productId={params.productId} 
          appUrl={`${process.env.NEXT_APP_URL}`} 
          product={product as Product} 
        />
      </div>
      <Separator className="mb-4" />
      <div>
        <div className="p-3 flex flex-col">
          <div id="custom_api_title">
            <span className="text-2xl font-bold space-y-4">Pro Api</span>
          </div>
          <div className="mt-1">
            <span className="text-sm font-medium space-y-4 text-muted-foreground">
              Manage your products with a 3rd-party application.
            </span>
          </div>  
        </div>
        <Separator />
        <div>
          {!isPro && (
            <div className="flex items-center justify-center p-4 space-x-4 gap-x-3">
              <Button className="flex items-center bg-primary text-md text-secondary">
                <Link href={`/dashboard/upgrade`}>
                  Upgrade to Pro
                </Link>
              </Button>
            </div>
          )}
          {customApi.map(a => !a.id) && isPro && (
            <CustomApiForm storeId={params.storeId} productId={params.productId} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductApiPage;