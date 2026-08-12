/**
 * The subject of the site. Rendered as a featured item, not a fifth equal link.
 * NavHeader and NavHeaderFallback must render it identically so the SSR nav matches.
 */
export const featuredNavLink = { label: "Overview", href: "/overview" };

export const navLinks = [
  { label: "Governance", href: "/governance" },
  { label: "Contracts", href: "/#contracts" },
  { label: "Upgrade", href: "/upgrade" },
  { label: "Clients", href: "/clients" },
];
