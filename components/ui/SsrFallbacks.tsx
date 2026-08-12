import Link from "next/link";
import { featuredNavLink, navLinks } from "@/lib/nav-links";
import { OlympiaMark } from "@/components/ui/OlympiaMark";


export function NavHeaderFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-default)] bg-[var(--bg-overlay)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <OlympiaMark size={36} alt="Olympia" />
          <span className="text-lg font-bold tracking-tight">OLYMPIA</span>
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href={featuredNavLink.href}
            className="rounded-full border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--text-primary)]"
          >
            {featuredNavLink.label}
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-muted)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
