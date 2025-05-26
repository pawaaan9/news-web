import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NWEJP9ENF3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NWEJP9ENF3');
          `}
        </Script>
      </head>
      <body className={` antialiased font-rubik`}>{children}</body>
    </html>
  );
}
