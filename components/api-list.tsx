"use client";

import { useState } from "react";
import { CommandIcon, ServerIcon } from "lucide-react";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import { Product } from "@prisma/client";

interface ApiListProps {
  storeId: string;
  productId: string;
  appUrl: string;
  product: Product;
}

export const ApiList: React.FC<ApiListProps> = ({ storeId, productId, appUrl, product }) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const copyUrl = async (url: string) => {
    const navigator = window.navigator;
    
    const copyApiUrl = navigator.clipboard.writeText(url);

    const readText = await navigator.clipboard.readText();

    if (readText === url) {
      toast.success("Success!");
    } else {
      toast.error("Something went wrong.");
    }
  }

  return (
    <div>
        <div>
          <div className="p-4 mb-6 rounded-md bg-gray-200 w-full h-auto">
            <div className="flex items-center space-x-4">
              <ServerIcon className="h-5 w-5" />
              <label className="text-lg font-bold mr-2">GET</label>
              <span className="flex items-center flex-row round ed-lg bg-gray-900 py-2 text-white w-full">
                <p className="ml-4 text-md text-gray-300 text-muted-foreground">
                  {`${appUrl}/api/product/store/${storeId}/${product.id}/get?auth=token&token=user_based`}
                </p>
                <Button 
                  className="ml-auto mr-6" 
                  size="icon" 
                  variant="outline" 
                  onClick={() => copyUrl(`${appUrl}/store/${storeId}/${product.id}/get?auth=token&token=user_based`)}
                >
                  <CommandIcon className="h-5 w-5" />
                </Button>
              </span>
            </div>
          </div>
          {/* <Separator className="mb-6 mt-6" /> */}
          <div className="p-4 rounded-md bg-gray-200 w-full h-auto">
            <div className="flex items-center space-x-4">
              <ServerIcon className="h-5 w-5" />
              <label className="text-lg font-bold mr-2">DELETE</label>
              <span className="flex items-center flex-row rounded-lg bg-gray-900 py-2 text-white w-full">
                <p className="ml-4 text-md text-gray-300 text-muted-foreground">
                  {`${appUrl}/api/product/store/${storeId}/${product.id}/delete?auth=token&token=user_based`}
                </p>
                <Button 
                  className="ml-auto mr-6" 
                  size="icon" 
                  variant="outline" 
                  onClick={() => copyUrl(`${appUrl}/store/${storeId}/${product.id}/delete?auth=token&token=user_based`)}
                >
                  <CommandIcon className="h-5 w-5" />
                </Button>
              </span>
            </div>
          </div>
          {/* <Separator className="mb-6 mt-6" /> */}
        </div>
    </div>
  )
}