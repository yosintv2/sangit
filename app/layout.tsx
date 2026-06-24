import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sgpostalcode.com"),
  title: {
    default:
      "Singapore Postal Code Directory — Search 141,726+ Verified SG Postal Codes | SgPostalCode.com",
    template: "%s | SgPostalCode.com",
  },
  description:
    "Find any Singapore postal code instantly. Search 141,726+ verified addresses by building name, road, district or 6-digit code. Free postal code lookup with maps and GPS coordinates.",
  keywords: [
    "singapore postal code",
    "sg postal code",
    "singapore zip code",
    "postal code singapore",
    "singapore postcode lookup",
    "find postal code singapore",
    "6 digit postal code singapore",
    "singapore address postal code",
    "postal code finder singapore",
    "singapore post code directory",
  ],
  authors: [{ name: "SgPostalCode.com" }],
  creator: "SgPostalCode.com",
  publisher: "SgPostalCode.com",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_SG",
    siteName: "SgPostalCode.com",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@sgpostalcode",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-SG">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
        {/* Google AdSense — replace with your publisher ID */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-C2B2V8LXHS"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-C2B2V8LXHS');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
