import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CountryProvider } from "@/contexts/country-context";
import AdScripts from "@/components/ad-scripts";

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
        <CountryProvider>
          <div className="relative">
            <AdScripts />
            {children}
          </div>
        </CountryProvider>
      </body>
    </html>
  );
}
