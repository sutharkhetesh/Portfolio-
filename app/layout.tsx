import type { Metadata } from "next";
import { DM_Mono, Manrope, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" }); 
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

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
