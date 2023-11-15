import { NextResponse } from "next/server";

import { auth } from "@/tools/CurrentUser";

import { db } from "@/libs/db";

export async function DELETE(
  request: Request, 
  { params }: { params: { storeId: string } }
){
  try {
    const { id } = await auth();

    if (!id) {
      return new NextResponse("Unauthencated", { status: 401 });
    }

    const checkForStore = await db.store.findUnique({
      where: {
        id: params.storeId
      }
    });

    if (!checkForStore || !checkForStore.id) {
      return new NextResponse("Store does not exist", { status: 400 });
    }

    if (checkForStore.ownerId !== id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deleteStore = await db.store.delete({
      where: {
        id: params.storeId
      }
    });
    
    return NextResponse.json(deleteStore, { status: 200 });
  } catch (error: any) {
    console.log(`[STORE_DELETE] # There was an error deleting the store. Error: ${error}`);
    return new NextResponse("Internal Error", { status: 500, statusText: error });
  }
}