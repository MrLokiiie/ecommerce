import { PersonalInformation } from "@prisma/client";

import { db } from "@/libs/db";

type CreateInformationData = {
  firstName: string;
  lastName: string;
  creditCardNumber: string;
  creditCardCode: string;
}

export async function createUserInformation(data: CreateInformationData, userId: string) {
  try {
    const createUserInformationAction = await db.personalInformation.create({
      data: {
        userId,
        firstName: data.firstName,
        lastName: data.lastName,
        creditCardCode: data.creditCardCode,
        creditCardNumber: data.creditCardNumber,
      }
    });
  
    return createUserInformationAction; 
  } catch (error: any) {
    console.log(`[SERVER_ACTIONS_USER_INFORMATION_CREATE] # There was an error creating the information. Error: ${error}`);
  }
}