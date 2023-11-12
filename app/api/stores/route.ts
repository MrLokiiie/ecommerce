import { NextResponse } from "next/server";

import { getCurrentUser } from "@/tools/CurrentUser";
import { db } from "@/libs/db";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const storesByUser = await db.store.findMany({
      where: {
        ownerId: currentUser.id
      }
    });

    return storesByUser;
  } catch (error: any) {
    console.log(`[STORES_GET] # There was an Internal Error. Error: ${error}`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: Request
) {
  try {
    const body = await req.json();
    const currentUser = await getCurrentUser();

    const {
      storeName,
      storeDescription
    } = body;
    
    if (!currentUser || !currentUser.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!storeName || !storeDescription) {
      return new NextResponse("Invalid transport data", { status: 400 });
    }

    const store = await db.store.create({
      data: {
        storeName,
        storeDescription,
        ownerId: currentUser.id,
      }
    });

    return NextResponse.json(store, { status: 200 });
  } catch (error: any) {
    console.log(`[STORES_POST] # There was an Internal Error. Error: ${error}`);
    return new NextResponse("Internal Error", { status: 400 });
  }
}