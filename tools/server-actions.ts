import { PersonalInformation } from "@prisma/client";

import { db } from "@/libs/db";

type CreateInformationData = {
  firstName: string;
  lastName: string;
  creditCardNumber: string;
  creditCardCode: string;
}

interface ServerActions {
  createInformation: (data: CreateInformationData, userId: string) => void;
}

export const serverActions: ServerActions = {
  async createInformation(data, userId) {
    const updateInformation = await db.personalInformation.create({
      data: {
        userId,
        firstName: data.firstName,
        lastName: data.lastName,
        creditCardCode: data.creditCardCode,
        creditCardNumber: data.creditCardNumber,
      },
      include: {
        user: true
      }
    });
    console.log(updateInformation);

    if (!updateInformation || !updateInformation.id) {
      return 500;
    }

    return 200;
  },
};