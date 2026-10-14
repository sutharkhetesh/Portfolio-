import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Self-host the existing typefaces so builds do not depend on Google Fonts.
const manrope = localFont({ src: "./fonts/manrope-latin.woff2", weight: "200 800", variable: "--font-manrope", display: "swap" });
const spaceGrotesk = localFont({ src: "./fonts/space-grotesk-latin.woff2", weight: "300 700", variable: "--font-space", display: "swap" });
const dmMono = localFont({ src: [
  { path: "./fonts/dm-mono-regular-latin.woff2", weight: "400" },
  { path: "./fonts/dm-mono-medium-latin.woff2", weight: "500" },
], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Khetesh Suthar | Frontend Developer",
  description: "Portfolio of Khetesh Suthar, a frontend developer specializing in React, Next.js, and ERP product experiences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${spaceGrotesk.variable} ${dmMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
