import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
    default: "OlympiaDAO — Sustainable Governance for Ethereum Classic",
    template: "%s | OlympiaDAO",
  },
  description:
    "Olympia is a staged governance and funding system for Ethereum Classic. It redirects EIP-1559 basefee into an on-chain Treasury, then builds governance layers to allocate funds transparently.",
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
    "ECIP-1113",
    "hard fork",
    "protocol funding",
  ],
  authors: [
    { name: "Cody Burns", url: "https://github.com/realcodywburns" },
    { name: "Chris Mercer", url: "https://github.com/chris-mercer" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://olympiadao.org",
    siteName: "OlympiaDAO",
    title: "OlympiaDAO — Sustainable Governance for Ethereum Classic",
    description:
      "A staged governance and funding system for Ethereum Classic. Basefee → Treasury → Governance.",
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
    title: "OlympiaDAO — Sustainable Governance for Ethereum Classic",
    description:
      "A staged governance and funding system for Ethereum Classic. Basefee → Treasury → Governance.",
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
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
