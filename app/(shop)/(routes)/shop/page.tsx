import { GetStores } from "@/tools/GetStores"

const ShopHomePage = async () => {
  const stores = await GetStores();

  return (
    <div>
      <div className="div flex items-center p-4 border border-b mb-[18px]">
        <h3
          className="text-3xl font-bold text-center"
        >
          What's hot??
        </h3>
      </div> 
    </div>
  );
}

export default ShopHomePage;