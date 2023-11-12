interface HeadersProps {
  cookies: Function;
  cookieName?: string;
  cookieExpirationDate?: number;
}

type JobRolesEnum = "SET" | "MANAGER" | "GET" | "DELETE"


export function HeadersServerContext({
  cookies,
  cookieExpirationDate,
  cookieName,
}: HeadersProps,
  token?: string,
  job?: JobRolesEnum
) {
  const CookiesContext = cookies();

  if (job === "SET") {
    const cookieOptions = {
      path: '/',
      maxAge: `31536000`,
      sameSite: 'strict',
    };
    CookiesContext.set(null, 'ACCOUNT__COOKIE', `${token}`, `${cookieOptions}`);
  }
}