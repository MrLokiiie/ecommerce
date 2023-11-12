import type { Metadata } from "next"
import { cookies } from "next/headers";
import { AuthProvider } from "@/providers/AuthProvider"
import './globals.css';
import './customStyles.css'

import { getCurrentUser } from "@/tools/CurrentUser";
import { HeadersServerContext } from "@/tools/HeadersServerContext";
import { ToasterProvider } from "@/providers/ToasterProvider";

export const metadata: Metadata = {
  title: 'E-Commerce',
  description: 'Nano'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <AuthProvider>
        <body>
          {children}
          <ToasterProvider />
        </body>
      </AuthProvider>
    </html>
  )
}
