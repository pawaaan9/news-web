"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { isAdminRoute } from "@/utils/is-admin-route";

export default function AdScripts() {
  const pathname = usePathname();
  const isAdmin = isAdminRoute(pathname);

  if (isAdmin) return null;

  return (
    <>
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
    </>
  );
}
