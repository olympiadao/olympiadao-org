/**
 * Shared by NavHeader (a client component) and NavHeaderFallback (a server
 * component). It lives in its own module rather than being exported from
 * NavHeader because exports of a "use client" module become client references
 * on the server — importing the array from there yields a reference object, not
 * the array, and `.map` throws at prerender.
 */
export const navLinks = [
  { label: "Governance", href: "/governance" },
  { label: "Contracts", href: "/#contracts" },
  { label: "Upgrade", href: "/upgrade" },
  { label: "Clients", href: "/clients" },
];
