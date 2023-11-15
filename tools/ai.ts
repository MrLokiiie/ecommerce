import { Product } from "@prisma/client";

import { db } from "@/libs/db";

type SearchAiIndex<CTX extends any, Filter extends any, DESC extends any> = {
  /** The Search Content */
  ctx: CTX;
  /** The Search Filter */
  filter: Filter;
}

type SearchAiFilterIndex = "NAME" | "DESC";

export class SearchAi<Index extends SearchAiIndex<string, SearchAiFilterIndex, string>> {
  public async aiSearchByDesc<I extends Index>(desc: I['ctx']) {
    
  }

  public async aiSearchByName<I extends Index>(ctx: I['ctx']): Promise<Product[]> {
    const replacedCtx = ctx?.replace("_", " ");

    // Create a variable named "products" and get all the products (.findMany()) and await it.
    const products = await db.product.findMany();

    // Filter the products.
    const filterProducts = products.filter((product) => 
        replacedCtx?.split('').some((letter) => product.productName.toLowerCase().includes(letter.toLowerCase()))
        && product.productName.toLowerCase().includes(replacedCtx?.toLowerCase())
      );
      
    // Return the filtered products.
    return filterProducts;
  }

  public async aiSearch<I extends Index>(props: I): Promise<Product[]> {
    const products = await db.product.findMany();
    
    const ctx = props.ctx.replace("_", " ");
    
    // Filter the products.
    const filterProducts = products.filter((product) => 
      !product.productName.includes(ctx) && !product.productName.includes(ctx));

    // Return the filtered produts.
    return filterProducts;
  }
}

const searchAi = new SearchAi();
