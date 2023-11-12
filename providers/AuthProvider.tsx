import { UseRoutes } from "@/hooks/useRoutes";
import { getCurrentUser } from "@/tools/CurrentUser";

export async function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <>
      <html lang="en">
        <body>
          {children}
          <UseRoutes currentUser={currentUser} />
        </body>
      </html>
    </>
  );
}
