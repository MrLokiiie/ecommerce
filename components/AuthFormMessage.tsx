"use client";

import qs from "query-string";
import { useSearchParams, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const AuthFormMessage = () => {
  const params = useSearchParams();
  const router = useRouter();

  const authType = params.get("authType");

  if (!authType) {
    useEffect(() => {
      const query = {
        authType: "login"
      };
      
      const url = qs.stringifyUrl({
        url: window.location.href,
        query
      }, { skipNull: true, skipEmptyString: true });
  
      router.push(url);
    }, [router, qs]);
  }

  const authMessage = authType === "login" ? "Login" : "Signup"

  return <>
    {authMessage}
  </>
}