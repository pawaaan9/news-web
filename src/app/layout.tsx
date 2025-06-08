import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CountryProvider } from "@/contexts/country-context";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tamil Media",
  description: "Tamil Media News Portal",
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
  openGraph: {
    title:
      "Tamilmedia - Tamil media Website | Tamil News website | Sri Lanka News Online | Breaking News, Latest Tamil News, Tamil News tamilmedia - tamilmedia.lk",
    description:
      "தமிழ் தாயகம் மற்றும் உலகம் முழுவதும் இருந்து உங்களுக்குத் தேவையான முக்கிய செய்திகள், அரசியல், தேர்தல்கள், வணிகம், விளையாட்டு, பொருளாதாரம், தற்போதைய விவகாரம் மற்றும் பலவற்றைப் பற்றிய உடனடி செய்திகள்.",
    url: "https://tamilmedia.lk/",
    siteName: "Tamilmedia.lk",
    images: [
      {
        url: "https://tamilmedia.lk/images/cover.jpg",
        width: 1200,
        height: 630,
        alt: "Tamilmedia.lk Cover",
      },
    ],
    type: "website",
    locale: "ta_LK",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Tamilmedia - Tamil media Website | Tamil News website | Sri Lanka News Online | Breaking News, Latest Tamil News, Tamil News tamilmedia - tamilmedia.lk",
    description:
      "தமிழ் தாயகம் மற்றும் உலகம் முழுவதும் இருந்து உங்களுக்குத் தேவையான முக்கிய செய்திகள், அரசியல், தேர்தல்கள், வணிகம், விளையாட்டு, பொருளாதாரம், தற்போதைய விவகாரம் மற்றும் பலவற்றைப் பற்றிய உடனடி செய்திகள்.",
    images: ["https://tamilmedia.lk/images/cover.jpg"],
    site: "@tamilmedia", // Change to your Twitter handle if you have one
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1944518986303343"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
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
        <title>Tamil Media - Latest Tamil News</title>
        <meta
          property="og:title"
          content="Tamilmedia - Tamil media Website | Tamil News website | Sri Lanka News Online | Breaking News, Latest Tamil News, Tamil News tamilmedia - tamilmedia.lk"
        />
        <meta
          property="og:description"
          content="தமிழ் தாயகம் மற்றும் உலகம் முழுவதும் இருந்து உங்களுக்குத் தேவையான முக்கிய செய்திகள், அரசியல், தேர்தல்கள், வணிகம், விளையாட்டு, பொருளாதாரம், தற்போதைய விவகாரம் மற்றும் பலவற்றைப் பற்றிய உடனடி செய்திகள்."
        />
        <meta
          property="og:image"
          content="https://tamilmedia.lk/images/cover.jpg"
        />
        <meta property="og:url" content="https://tamilmedia.lk/" />
        <meta property="og:type" content="website" />
      </head>
      <body className={inter.className}>
        <CountryProvider>{children}</CountryProvider>
      </body>
    </html>
  );
}
