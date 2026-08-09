import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OlympiaDAO",
    short_name: "Olympia",
    description:
      "On-chain governance and treasury infrastructure for Ethereum Classic",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f10",
    theme_color: "#0a0f10",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
