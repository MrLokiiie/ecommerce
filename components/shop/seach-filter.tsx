"use client";

interface SearchFitlerProps {
  searchFilter: any;
  setSearchFilter: Function;
}

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const SeachFilter: React.FC<SearchFitlerProps> = ({ searchFilter, setSearchFilter }) => {
  const router = useRouter();
  const pathname = usePathname();

  const setFilter = useCallback(() => {
    if (searchFilter === "NAME") {
      setSearchFilter("DESC");

      router.push(`${pathname}?filter=desc`)
    } else {
      setSearchFilter("NAME");

      router.push(`${pathname}?filter=name`)
    }
  }, [searchFilter, setSearchFilter])

  return (
    <div className="flex items-center justify-center flex-row gap-x-2">
      <Button
        className="mr-4"
        onClick={setFilter}
        variant={searchFilter === "NAME" ? "default" : "outline"}
      >
        Name
      </Button>
      <Button
        className="mr-4"
        variant={searchFilter === "DESC" ? "default" : "outline"}
        onClick={setFilter}
      >
        Desc
      </Button>
    </div>
  )
}