import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./_contexts/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomeCalender",
  description: "Webhosted calender for your home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {
          <main className="flex h-screen w-screen flex-col items-center justify-between p-4">
            <AppProvider>{children}</AppProvider>
          </main>
        }
      </body>
    </html>
  );
}
