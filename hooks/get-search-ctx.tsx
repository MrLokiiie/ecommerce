"use client";

type GetSearchContextType = {
  
}

import { useSearchParams } from "next/navigation";

export const GetSearchContext = ({ }: GetSearchContextType) => {
  const params = useSearchParams();

  const ctx = params.get("ctx");

  return ctx;
}