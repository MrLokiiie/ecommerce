"use client";

interface SearchResponseInterface {
  product: Product[];
};

import { useState } from "react";
import { Product } from "@prisma/client";

import { SearchAi } from "@/tools/ai";

export const SearchResponse: React.FC<SearchResponseInterface> = async ({ product }) => {
  return (
    <div>
      {product.map((product) => (
        <div>{product.productName}</div>
      ))}
    </div>
  )
}
