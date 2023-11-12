import { NextResponse } from "next/server";
import { cookies as Cookies, cookies } from "next/headers";

import bcrypt from "bcrypt";
import crypto from 'crypto';

import { db } from "@/libs/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      password,
      email,
    } = body;

    if (!name) {
      return new NextResponse("Invalid Credentials", { status: 400 });
    }

    if (!password) {
      return new NextResponse("Invalid Credentials", { status: 400 });
    }

    if (!email) {
      return new NextResponse("Invalid Credentials", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const generateCookie = (): string => {
      const randomBytes = crypto.randomBytes(32);
      return randomBytes.toString('hex');
    }

    const cookie = generateCookie() as string;

    const account = await db.account.create({
      data: {
        username: name,
        password: password,
        email,

        hashedPassword,
        account_cookie: cookie,
      }
    });
  

    const cookies = Cookies();

    const accountCookie = cookies.set("ACCOUNT__COOKIE", `${cookie}`);
    
   return NextResponse.json(account, { status: 200 });
  } catch (error: any) { 
    console.log("Their has been an error. Error:", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}