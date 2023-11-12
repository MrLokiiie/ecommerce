"use client";

import { useRouter } from "next/navigation";

export function GetRouter() {
  const router = useRouter();

  return router as any;
}