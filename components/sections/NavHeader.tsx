"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChainSelector } from "@/components/chain-selector";
import { useChainConfig } from "@/lib/hooks/use-chain-config";
import { featuredNavLink, navLinks } from "@/lib/nav-links";
import { OlympiaMark } from "@/components/ui/OlympiaMark";

export function NavHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const config = useChainConfig();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-default)] bg-[var(--bg-overlay)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <OlympiaMark size={36} alt="Olympia" />
          <span className="text-lg font-bold tracking-tight">OLYMPIA</span>
          {/* Visible where there is room for it: the mobile-menu range, then again
              at xl. Between lg and xl the desktop nav needs the width, and the
              header clipped its own Launch App button before this rule existed. */}
          <span className="hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--brand-green)] sm:inline-flex lg:hidden xl:inline-flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--brand-green)]" />
            {/* The chain name repeats what the ChainSelector shows, and the row has
                no width for both once the desktop nav appears at lg. */}
            Dev 0.1<span className="lg:hidden">&nbsp;&middot; {config.name}</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href={featuredNavLink.href}
            className="rounded-full border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] px-4 py-1.5 text-sm font-semibold text-[var(--text-primary)] transition-colors duration-200 hover:bg-[var(--brand-green)] hover:text-[var(--background)]"
          >
            {featuredNavLink.label}
          </Link>
          <ul className="flex items-center gap-5 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="whitespace-nowrap text-sm font-medium text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ChainSelector />
          <ThemeToggle />
          <a
            href="https://app.olympiadao.org"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 whitespace-nowrap rounded-full bg-[var(--brand-green)] px-5 py-2 text-sm font-semibold text-[var(--background)] transition-all duration-200 hover:brightness-110"
          >
            Launch App
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-[var(--border-default)] bg-[var(--background)] px-6 py-4 lg:hidden">
          <Link
            href={featuredNavLink.href}
            onClick={() => setMobileOpen(false)}
            className="mb-3 block rounded-lg border border-[var(--border-brand)] bg-[var(--brand-green-subtle)] px-4 py-3 text-sm font-semibold text-[var(--text-primary)]"
          >
            {featuredNavLink.label}
          </Link>
          <ul className="flex flex-col list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block py-3 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3 pt-3">
            <ChainSelector />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
