import { db } from "@/libs/db";

interface User {
  id: string;
  username: string;
  password: string;
  hashedPassword: string;
  email: string;
  emailConfirmed: boolean;
  createdAt: Date;
  updatedAt: Date;
  account_cookie: string;
}

interface ApiResponse {
  error: any | any[];
  responseData: any | any[];
  status: number;
  transportData: any | any[]; 
}

export interface Api {
  get<type extends G = "GET", URL extends string, R extends ApiResponse>(url: URL): Promise<R>;
}

export class CreateEnhancer<U extends User, API extends Api> {
  public constructor<R extends string>(userId: U['id']) {
    const checkUser = await db.account.findFirst({
      where: {
        id: userId
      }
    });

    if (!checkUser || !checkUser.id) {
      return <"User does not exist">("User does not exist");
    };

    if (checkUser) {

    }
  }

  checkUser<id extends string = string>(userId: id): Promise<User> {
    const user = await db.account.findFirst({
      where: {
        id: userId
      }
    });

    if (!user) {
      return null as User;
    };

    if (user) {
      return user;
    }
  }

  /** Api2 */
  api: {
    get: Api['get']
  }

  enableEnhancer<id extends U = U['id']>(userId: id): Promise<boolean> {
    const checkUser = await this.checkUser(userId);

    if (checkUser) {
      console.log("User exists.")
    }
  }
}
