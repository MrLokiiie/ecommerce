"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {}

type SearchFilterType = "DESC" | "NAME";

export const SearchBar = ({}: SearchBarProps) => {
  const router = useRouter();
  const [searchInput, setSeachInput] = useState<string>("");

  const [searchFilter, SetSearchFilter] = useState<SearchFilterType>("NAME");

  const search = () => {
    if (searchInput.length === 0) {
      toast.error('You must search something!');
    } else {
      const replaceSpaces = searchInput.replace(" ", "_");
      console.log(replaceSpaces, searchFilter);

      const queryToJSON = JSON.stringify({
        filter: searchFilter,
        ctx: searchInput
      });

      const setSearchQuery = window.localStorage.setItem("searchFilter", queryToJSON);
      
      router.push(`/shop/search/${searchInput.replace(" ", "_")}`);
    }
  }

  return (
    <div className="flex items-center justify-center flex-row">
      <div
        className="
          flex
          items-center
          justify-center
          mx-auto
          space-y-4
          h-6
          rounded-full
          bg-white
          w-[600px]
          border
          border-b
          shadow-lgs
        "
      >
        <Input 
          className="flex rounded-full bg-white placeholder:text-center placeholder:text-muted-foreground placeholder:text-sm"
          placeholder="Search bar..."
          value={searchInput}
          onInput={(e) => setSeachInput(e.currentTarget.value)}
        />
      </div>
      <Button 
        onClick={search} 
        variant="outline" 
        className="space-y-4 gap-x-2 ml-6" 
        size="icon"
      >
        <SearchIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
