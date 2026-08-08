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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Olympia DAO",
  alternateName: "OlympiaDAO",
  url: "https://olympiadao.org",
  logo: "https://olympiadao.org/logo.svg",
  description:
    "On-chain governance and treasury infrastructure for Ethereum Classic. The Olympia DAO governs core client software, critical infrastructure, and network security through binding on-chain proposals.",
  foundingDate: "2025",
  sameAs: [
    "https://x.com/OlympiaDAO_ETC",
    "https://github.com/olympiadao",
    "https://app.olympiadao.org",
    "https://olympiatreasury.org",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "OlympiaDAO",
  url: "https://olympiadao.org",
  description:
    "On-chain governance and treasury infrastructure for Ethereum Classic's core development, critical infrastructure, and network security.",
  publisher: {
    "@type": "Organization",
    name: "Olympia DAO",
    url: "https://olympiadao.org",
  },
};

export const metadata: Metadata = {
  title: {
    default: "OlympiaDAO — On-Chain Governance for Ethereum Classic",
    template: "%s | OlympiaDAO",
  },
  description:
    "Olympia delivers Glamsterdam-era EVM alignment for Ethereum Classic — every Solidity compiler, Foundry, Hardhat, wagmi, and viem works on ETC without modification. On-chain governance and treasury infrastructure for Ethereum Classic's core development, critical infrastructure, and network security. Basefee funds the protocol vault, a value that was set to be destroyed. Miner block rewards and tips remain completely untouched.",
  keywords: [
    "Glamsterdam EVM alignment",
    "Glamsterdam",
    "Fusaka EVM alignment",
    "Ethereum Classic",
    "ETC",
    "Olympia",
    "DAO",
    "governance",
    "treasury",
    "EIP-1559",
    "ECIP-1111",
    "ECIP-1112",
    "ECIP-1121",
    "ECIP-1122",
    "Fusaka",
    "EVM upgrade",
    "EVM compatibility",
    "Foundry ETC",
    "Hardhat ETC",
    "wagmi ETC",
    "EVM tooling",
    "protocol funding",
    "basefee",
    "miner rewards untouched",
    "block rewards",
    "ETC treasury",
    "core development funding",
    "MiCA",
    "FSA Green List",
    "digital commodity",
    "decentralized asset",
    "regulated stablecoin",
    "Japan crypto-asset",
    "CLARITY Act",
    "GENIUS Act",
    "Dencun",
    "Pectra",
    "Solidity compatibility",
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
      "On-chain governance and treasury for Ethereum Classic. Basefee funds the protocol vault — a value set to be destroyed. Miner block rewards and tips remain completely untouched.",
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
      "On-chain governance and treasury for Ethereum Classic. Basefee funds the protocol vault — a value set to be destroyed. Miner block rewards and tips remain completely untouched.",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--brand-green)] focus:px-4 focus:py-2 focus:text-[var(--background)] focus:outline-none"
          >
            Skip to main content
          </a>
          <Providers>
            <div id="main-content">{children}</div>
          </Providers>
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
