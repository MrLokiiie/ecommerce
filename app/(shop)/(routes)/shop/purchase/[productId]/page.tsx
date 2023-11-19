import { PurchaseForm } from "@/components/purchase-form";
import { Separator } from "@/components/ui/separator";
import { GetProductById } from "@/tools/GetProducts";

interface PurchasePage {
  params: {
    productId: string;
  }
}

const PurchasePage: React.FC<PurchasePage> = async ({ params }) => {
  const product = await GetProductById(params.productId);

  return (
    <div className="h-screen bg-gray-900">
      <div className="flex items-center justify-between h-screen">
        <div className="ml-72">
          <h3 className="text-center text-white text-3xl">
            Purchase {product.productName}
          </h3>
          <Separator className="opacity-50 mt-3" />
        </div>
        <div className="w-96 h-[520px] mr-96 p-4 bg-white rounded-md shadow-sky-700 shadow-lg hover:shadow-sky-300 duration-300">
          <PurchaseForm productId={params.productId} />
        </div>
      </div>
    </div>
  )
}

export default PurchasePage;