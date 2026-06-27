import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/store/Provider";
import { Toaster } from "@/components/ui/toaster";
import { SiteFooter } from "@/components/site-footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Inkwell — Local-First Collaborative Editor",
  description: "A CRDT-powered editor that works offline first and syncs deterministically.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Pre-hydrate the session so client `useSession()` returns "authenticated"
  // on first render instead of getting stuck in "loading" while it tries to
  // fetch /api/auth/session through the reverse-proxy.
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Newsreader:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SessionProvider session={session}>
          <StoreProvider>
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <Toaster />
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
