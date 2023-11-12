import bcrypt from "bcrypt";
import { db } from "@/libs/db";
import { SetCookie } from "@/hooks/SetCookie";

interface Props {
  email: string;
  password: string;
}

// @ts-ignore
export async function AccountSignIn({
  email,
  password
}: Props): Promise<any> {
  try {
    const emailProvider = email.split("@")[1];

    if (emailProvider !== "gmail.com") {
      return `The email provider must be GMAIL, and not ${emailProvider}`;
    }

    const accountPassword = await db.account.findFirst({
      where: {
        email
      }
    });

    if (!accountPassword) {
      return null;
    }

    const hashedPassword = accountPassword.hashedPassword;
    const comparePasswords = await bcrypt.compare(hashedPassword, password);

    if (comparePasswords) {
      const cookie = accountPassword.account_cookie;
      return cookie;
    } else {
      return null;
    }
  } catch (error) {
    
  }
}