import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tamilmedia",
  description:
    "Latest Tamil news and articles from Sri Lanka and around the world.",
  keywords: [
    "Tamil news",
    "Sri Lanka news",
    "Tamil articles",
    "Breaking news",
    "Tamilmedia",
  ],
  metadataBase: new URL("https://tamilmedia.lk"),
  alternates: {
    canonical: "/",
    languages: {
      ta: "/ta",
      en: "/en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased font-rubik`}>{children}</body>
    </html>
  );
}
