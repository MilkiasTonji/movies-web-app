import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montsraa = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movies Ap",
  description: "App for listing movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montsraa.className} bg-background`}>{children}</body>
    </html>
  );
}
