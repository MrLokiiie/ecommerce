import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GetProductById } from "@/tools/get-store-name-product-id";

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
            <CardTitle className="flex items-center justify-center">
              <span className="fixed mr-auto text-primary text-lg font-bold">{productName}</span>
            </CardTitle>
          </Card>
        </div>
      </div>
    </div>
  )
};

export default ProductPage;