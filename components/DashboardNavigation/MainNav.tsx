"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { Account, Product, Store } from "@prisma/client";

import { cn } from "@/lib/utils";

interface MainNavProps {
  currentUser: Account;
  className: string;
  stores: Store;
}

export const MainNav = ({
  currentUser,
  stores,
  className
}: MainNavProps) => {
  const params = useSearchParams();
  const pathname = usePathname();

  const routes = [
    {
      href: `/dashboard`,
      label: 'Dashboard',
    },
    {
      href: `/dashboard/store/${stores.id}`,
      label: 'Stores',
      active: pathname === `/dashboard/store/${stores.id}`,
    },
    {
      href: `/shop`,
      label: 'Shopping Center',
      active: pathname === '/shop'
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
}
