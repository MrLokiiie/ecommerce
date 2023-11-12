import { cookies } from "next/headers";
import { Account } from "@prisma/client";

import { db } from "@/libs/db";

type UserAccount = {
  id: string;
  username: string;
  password: string;
  hashedPassword: string;
  email: string;
  emailConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
  account_cookie: string;
};

export async function getCurrentUser(): Promise<Account | undefined> {
  try {
    const cookie = cookies();
    const accountCookie = cookie.get("ACCOUNT__COOKIE");

    const account_cookie = accountCookie?.value as string;
  
    if (!accountCookie?.name || !accountCookie?.value) {
      console.log("Not found.")
    }

    const account = await db.account.findUnique({
      where: {
        account_cookie
      }
    });

    return account as UserAccount;

  } catch {
    console.log("Their was an error.")
  }
}

type Auth = {
  id: string,
  email: string,
  username: string
}

export async function auth(): Promise<Auth> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      id: "",
      email: "",
      username: ""
    };
  };

  const {
    id,
    email,
    username
  } = currentUser;

  return {
    id,
    email,
    username
  };
};

