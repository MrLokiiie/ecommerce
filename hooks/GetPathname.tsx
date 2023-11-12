"use client";

import { usePathname } from "next/navigation";

export function GetPathname() {
  const pathname = usePathname();

  return pathname as String;
}