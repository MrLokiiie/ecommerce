import { NextResponse } from "next/server";

import { db } from "@/libs/db";
import { auth } from "@/tools/CurrentUser";

export async function POST(
  request: Request, 
  { params }: { params: { userId: string } }
) {
  try {
    const body = await request.json();
    const authencation = await auth();

    let userId = authencation.id;
    
    const { firstName, lastName, creditCardNumber, creditCardCode } = body;
    
    if (!firstName || !lastName || !creditCardNumber) {
      return new NextResponse("Invalid data", { status: 400 });
    };

    if (!userId) {
      return new NextResponse("Unauthencated", { status: 401 });
    };

    const checkForUser = await db.account.findUnique({
      where: {
        id: params.userId
      }
    });

    if (!checkForUser) {
      return new NextResponse("User does not exist", { status: 400 });
    }

    const createUserInformation = await db.personalInformation.create({
      data: {
        userId,
        firstName,
        lastName,
        creditCardNumber,
        creditCardCode
      },
      include: {
        user: true
      }
    });

    return NextResponse.json(createUserInformation, { status: 200 });
  } catch (error: any) {
    console.log(`[USER_USER_ID_PATCH] # There was an error creating adding the information. Error: ${error}`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}