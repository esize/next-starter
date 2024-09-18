import type { Metadata } from "next";

import AppNavbar from "@/components/app-navbar";
import Providers from "@/components/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Evan's Next.js Starter",
  description: "My very own Next.js starter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>"
      />
      <body className="flex min-h-[100dvh] flex-col">
        <Providers>
          <AppNavbar />
          <div className="flex-grow">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
