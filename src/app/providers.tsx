import { SessionProvider, validateRequest } from "@/lib/auth";

import { ThemeProvider } from "../components/theme-provider";

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
  return (
    <>
      <SessionProvider value={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
