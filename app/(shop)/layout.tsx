import { ShoppingNav } from "@/components/shop/shopping-nav";

import { getCurrentUser } from "@/tools/CurrentUser";

export default async function ShoppingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  
  return (
    <div>
      <ShoppingNav currentUser={currentUser} />
      <main>
        {children}
      </main>
    </div>
  )
}