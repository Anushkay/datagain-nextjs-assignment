import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Header from "./components/header";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Loading from "./loading";
import AppLayout from "./AppLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Datagain Assignment",
  description: "A Next.js application for managing appeals and calendars.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased text-gray-900">
        <Providers>
           <Suspense fallback={<Loading />}>
          <div className="min-h-screen p-4 bg-[#F6F7F8]">
            <div className="h-[calc(100vh-2rem)] flex flex-col rounded-lg">
              {/* Header */}
              <header className="fixed top-4 left-4 right-4 z-30 bg-white rounded-2xl">
                <Header />
              </header>

              <AppLayout>
                {children}
              </AppLayout>
            </div>
          </div>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
