import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GetProductById } from "@/tools/get-store-name-product-id";
import { DollarSign } from "lucide-react";

interface ProductPage {
  params: {
    productId: string
  }
}

const ProductPage: React.FC<ProductPage> = async ({ params }) => { 
  const product = await GetProductById(params.productId);
  const {
    productName,
    productPrice,
  } = product;

  return (
    <div className="pr-4">
      <div className="flex items-center right-0 fixed w-[600px] h-full bg-secondary space-y-4 gap-x-3 justify-center">
        <div className="flex items-center justify-center p-4">
          <Card className="space-y-4 gap-x-2 p-4 w-[560px] h-auto">
            <div className="flex items-center flex-col justify-center space-y-4 gap-x-3">
              <CardTitle className="flex items-center justify-center">
                <span className="fixed mr-auto text-primary text-lg font-bold">{productName}</span>
              </CardTitle>
              <CardDescription className="flex items-center justify-center">
                <span className="flex items-center justify-center mr-auto text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">{productPrice}</span>
                </span>
              </CardDescription>
            </div>
            <Separator className="w-full mt-6 mb-6" />
            <CardContent>
              <div className="space-y-4 gap-x-3">
                <label id="createdBy">
                  <span className="text-muted-foreground text-md text-gray-400">Created By {product.storeId}</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
};

export default ProductPage;