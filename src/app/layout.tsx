import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tamil media",
  description: "News and Articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased font-dmSans`}>{children}</body>
    </html>
  );
}
