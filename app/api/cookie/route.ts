import { NextResponse } from "next/server";
import { cookies as Cookies } from "next/headers";

import { db } from "@/libs/db";
import { compare } from "bcrypt";
import crypto from "crypto";

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();
    const {
      password,
      email,
    } = body;

    if (!password || !email) {
      return new NextResponse("Invalid credentials.", { status: 400 });
    }
    
    const account = await db.account.findUnique({
      where: {
        email
      }
    });

    if (!account || !account.email) {
      return new NextResponse("Email does not exist", { status: 400 });
    }

    const hashedPassword = account.hashedPassword;

    const comparePasswords = await compare(password, hashedPassword);

    if (comparePasswords) {
      const cookies = Cookies();

      cookies.set("ACCOUNT__COOKIE", `${account.account_cookie}`);
    } else {
      return new NextResponse("Invalid password.", { status: 400 });
    }
    
    return NextResponse.json(account, { status: 200 });
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}