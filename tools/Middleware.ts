import type { CurrentUserType } from "@/tools/CurrentUser";
import { Router } from "next/router";

type StringArray = string[];
type IntArray = number[];

interface MiddlewareProps {
  router: Function;
  pathname: string;
  currentUser: CurrentUserType;
};

export function Middleware({ router, pathname, currentUser }: MiddlewareProps) {
  const Router = router();

  if (!currentUser || !currentUser.id) {
    if (pathname !== "/") {
      if (pathname === "/terms") {
        // Ignore.
      } else {
        Router.push('/');
      }
    }
  }

  console.log("Hello!");
}