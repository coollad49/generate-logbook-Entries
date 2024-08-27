import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider";
import {Toaster} from '@/components/ui/toaster'

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Generate IT Report Entries",
  description: "App to generate IT report entries based on user input",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
