import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OlympiaDAO",
    short_name: "Olympia",
    description:
      "Sustainable governance and funding system for Ethereum Classic",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f10",
    theme_color: "#0a0f10",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
