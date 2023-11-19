interface SearchPageProps {
  params: {
    searchId: string;
  }
}

import Link from "next/link";
import { SearchAi } from "@/tools/ai";

import { SearchResponse } from "@/components/shop/search-response";
import { Button } from "@/components/ui/button";
import { GetStoreNameByProductId } from "@/tools/get-store-name-product-id";

const SearchPage = async ({ params }: SearchPageProps) => {
  const ai = new SearchAi();
  
  const filteredProducts = await ai.aiSearchByName(params.searchId as string);

  return (
    <div>
      <div className="div flex items-center p-4 border border-b mb-[18px]">
        <span className="text-md text-center font-bold">Search Result</span>
        <div className="flex items-center ml-auto">
          <Button
            variant="outline"
          >
            <Link href={`/about/product?category=search`}>
              Learn how we filter search responses.
            </Link>
          </Button>
        </div>
      </div>
      <SearchResponse products={filteredProducts} />
    </div>
  )
}

export default SearchPage;