"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  maxWidth?: string;
}

export function CollapsibleSection({
  id,
  title,
  subtitle,
  children,
  defaultExpanded = true,
  maxWidth = "max-w-6xl",
}: CollapsibleSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <section id={id} className="py-20">
      <div className={`mx-auto ${maxWidth} px-6`}>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mx-auto mb-4 flex w-full cursor-pointer items-center justify-center gap-3"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[var(--brand-green)]">
            {title}
          </h2>
          <ChevronDown
            size={24}
            className={`text-[var(--brand-green)] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        {subtitle && (
          <p className="mx-auto mb-12 max-w-2xl text-center text-[var(--text-muted)]">
            {subtitle}
          </p>
        )}

        <div
          className={`transition-all duration-300 ${
            expanded
              ? "max-h-[4000px] opacity-100"
              : "max-h-0 overflow-hidden opacity-0"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
