"use client";

import { Account } from "@prisma/client";
import { SearchIcon } from "lucide-react";

import { SearchBar } from "@/components/shop/search-bar";
import { Button } from "@/components/ui/button";

type ShoppingNavigationProps = {
  currentUser: Account;
}

export const ShoppingNav = ({
  currentUser
}: ShoppingNavigationProps) => {
  return (
    <div className="flex border border-b p-4 justify-center top-0 bg-gray-100 w-full h-16 border">
      <div className="flex flex-row items-center justify-center">
        <SearchBar />
      </div>
    </div>
  );
}
