import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { esES } from "@clerk/localizations";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Hunter",
  description: "Encuentra tu libro favorito en Book Hunter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className}`}>
        <ClerkProvider localization={esES}>
          <div className="flex flex-col min-h-[calc(100vh-128px)] justify-between">
            <Navbar />
            <main className="">
              {children}
            </main>
          </div>
        </ClerkProvider>
      </body>
    </html>
  );
}
