import { CreditCard, DollarSign, Package } from "lucide-react";

import { getCurrentUser } from "@/tools/CurrentUser";
import { Account, Product } from "@prisma/client";

import { Overview } from "@/components/ProductOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getProductRevenue } from "@/actions/get-product-revenue";
import { getProductGraphRevenue } from "@/actions/get-product-graph-revenue";
import { getProductSalesCount } from "@/actions/get-product-sales-count";

import { Heading } from "@/components/Heading";

import { useDeleteProduct } from "@/hooks/deleteProductAlert";

import { GetProductByIdNew } from "@/tools/GetProducts";
import { ProductNavigation } from "@/components/ProductNavigation";

import { Separator } from "@/components/ui/separator";
import { ProductModal } from "@/components/ProductModal";
import { DeleteProduct } from "@/components/delete-product";
import { db } from "@/libs/db";

interface ProductsPage {
  searchParams: {
    storeId: string & {
      productId: string;
    }
  }
}

const ProductsPage = async ({
  searchParams
}: ProductsPage) => {
  const graphRevenue = await getProductGraphRevenue(searchParams.storeId, searchParams.storeId?.productId);
  const productRevenue = await getProductRevenue(searchParams.storeId, searchParams.storeId?.productId);
  const productSales = await getProductSalesCount(searchParams.storeId, searchParams.storeId?.productId);

  const currentUser = await getCurrentUser();
  
  const product = await db.product.findFirst({
    where: {
      id: searchParams.storeId?.productId
    }
  });

  return (
    <>
      <ProductModal initalData={product as Product} />
      <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center space-y-4 gap-x-2">
          <Heading title="Dashboard" description="Overview of your store" />
          <ProductNavigation currentUser={currentUser as Account} storeId={searchParams.storeId} product={product as Product} />
        </div>
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Product Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productRevenue}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{productSales}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Inf</div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
      </div>
      <DeleteProduct 
        storeId={product?.storeId as string} 
        productId={product?.id as string} 
        productName={product?.productName as string}
      />
    </>
  );
}

export default ProductsPage;