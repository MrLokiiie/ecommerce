import { NextResponse } from "next/server";

import { auth } from "@/tools/CurrentUser";

import { db } from "@/libs/db";

export async function PATCH(request: Request) {
  try {
    const { id } = await auth();

    const body = await request.json();
    const { storeId, productId } = body;
    
    if (!id) {
      return new NextResponse("Unauthencatied", { status: 401 });
    }

    if (!storeId && !productId) {
      return new NextResponse("Both store and product id are missing.", { status: 400 });
    }

    if (!storeId) {
      return new NextResponse("Missing the store id.", { status: 400 });
    }

    if (!productId) {
      return new NextResponse("Product id is missing.", { status: 400 });
    }

    const checkStoreOwner = await db.store.findFirst({
      where: {
        id: storeId,
      }
    });

    if (!checkStoreOwner) {
      return new NextResponse("Store does not exist.", { status: 400 });
    }

    if (checkStoreOwner.ownerId !== id) {
      return new NextResponse("Unauthorized.", { status: 401 });
    }

    const checkForProduct = await db.product.findFirst({
      where: {
        id: productId
      }
    });

    if (!checkForProduct) {
      return new NextResponse("Product does not exist.", { status: 400 });
    }

    const deleteProduct = await db.product.delete({
      where: {
        id: productId
      }
    });

    return NextResponse.json(deleteProduct, { status: 200 });
  } catch (error: any) {
    console.log(`[PRODUCT_DELETE] # Their was en error trying to delete the product. Error: ${error}`);
    return new NextResponse("Intenral Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { id } = await auth();

    const body = await request.json();
    const {
      productName,
      productPrice,
      fileName,
      productId,
      fileContent,
      storeId
    } = body;

    if (!productName || !fileName || !productId || !fileContent || !productPrice || !storeId) {
      return new NextResponse("Invalid transport data.", { status: 400 });
    }

    if (!id) {
      return new NextResponse("Unauthencatied", { status: 401 });
    }

    const checkOwner = await db.product.findFirst({
      where: {
        storeId,
      },
      include: {
        store: true
      }
    });

    if (!checkOwner || !checkOwner.store) {
      return new NextResponse("Store or product doesn't exist.", { status: 400 });
    }

    if (checkOwner.store.ownerId !== id) {
      return new NextResponse("Unauthorized.", { status: 401 });
    }

    const updateProduct = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        productName,
        productPrice,
        fileContent,
        fileName
      }
    });

    return NextResponse.json(updateProduct, { status: 200 });
  } catch (error: any) {
    console.log(`[PRODUCT_UPDATE] # Their was an error updating the product. Error: ${error}`);
    return new NextResponse("Internal Error", { status: 500, statusText: error });
  }
}
