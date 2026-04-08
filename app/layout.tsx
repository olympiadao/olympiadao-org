import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/lib/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "OlympiaDAO — On-Chain Governance for Ethereum Classic",
    template: "%s | OlympiaDAO",
  },
  description:
    "On-chain governance and treasury infrastructure for Ethereum Classic. Basefee revenue funds the protocol vault — block rewards and tips remain completely untouched.",
  keywords: [
    "Ethereum Classic",
    "ETC",
    "Olympia",
    "DAO",
    "governance",
    "treasury",
    "EIP-1559",
    "ECIP-1111",
    "ECIP-1112",
    "protocol funding",
  ],
  authors: [
    { name: "Cody Burns", url: "https://github.com/realcodywburns" },
    { name: "Chris Mercer", url: "https://github.com/chris-mercer" },
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://olympiadao.org",
    siteName: "OlympiaDAO",
    title: "OlympiaDAO — On-Chain Governance for Ethereum Classic",
    description:
      "On-chain governance and treasury infrastructure for Ethereum Classic. Basefee revenue funds the protocol vault.",
    images: [
      {
        url: "https://olympiadao.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "OlympiaDAO",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OlympiaDAO — On-Chain Governance for Ethereum Classic",
    description:
      "On-chain governance and treasury infrastructure for Ethereum Classic. Basefee revenue funds the protocol vault.",
    images: ["https://olympiadao.org/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://olympiadao.org"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "2725d4c6d2924e7e8b1ddfab7b4df968"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
