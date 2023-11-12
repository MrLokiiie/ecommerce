"use client";

import { useRouter } from "next/navigation";

import { Account } from "@prisma/client";

interface UserButtonProps {
  currentUser: Account;
}

export const UserButton = ({
  currentUser
}: UserButtonProps) => {
  const router = useRouter();

  if (!currentUser) {
    router.push('/');
  };

  return (
    <div className="space-y-4 hover:border p-4 shadow hover:border-gray-900 hover:border-bold duration-300 rounded-full bg-orange-600 h-8 w-8 flex items-center justify-center relative">
      <div className="fixed text-center items-center">
        <button className="text-center">
          <span className="text-white sticky text-md hover:text-lg duration-300">
            {currentUser?.username.slice(0, 1)}
          </span>
        </button>
      </div>
    </div>
  )
}