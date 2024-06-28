import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProvider } from "../contexts/AppContext";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.scss";

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
        <main>
          <AppProvider>{children}</AppProvider>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
