"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Account } from "@prisma/client";
import { useEffect, useState } from "react";
import { Middleware } from "@/tools/Middleware";

interface UseRoutesProps {
  currentUser: Account;
}

export function UseRoutes({ currentUser }: UseRoutesProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <Middleware
        router={useRouter}
        pathname={pathname}
        currentUser={currentUser}
      />
    </>
  )
}
