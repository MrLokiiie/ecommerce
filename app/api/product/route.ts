import { NextResponse } from "next/server";

import { auth } from "@/tools/CurrentUser";

import { db } from "@/libs/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = await auth();

    if (!id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const {
      productPrice,
      productName,
      fileName,
      storeId,
      fileContent
    } = body;

    if (!productPrice || !productName || !storeId || !fileContent || !fileName) {
      return new NextResponse("Invalid transport data.", { status: 400 });
    }

    const checkStore = await db.store.findUnique({
      where: {
        id: storeId
      }
    });

    if (!checkStore) {
      return new NextResponse("Store does not exist.", { status: 400 });
    }

    if (checkStore.ownerId !== id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    let productPriceToNumber = parseInt(productPrice);

    const createProduct = await db.product.create({
      data: {
        storeId,
        productName,
        fileContent,
        fileName: `${fileName}` as string,
        productPrice: productPriceToNumber,
        isHidden: false,
      }
    });

    return NextResponse.json(createProduct, { status: 200 });
  } catch (error) {
    console.log(`[PRODUCT_POST] # There was an error creating the Product. Error: ${error}`);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
