"use client";

import { 
  Account,
  Store
} from "@prisma/client";

interface DashboardUnderbarProps {
  stores: Store[];
  currentUser: Account;
}

export const DashboardUnderbar = ({
  stores,
  currentUser,
}: DashboardUnderbarProps) => {

}