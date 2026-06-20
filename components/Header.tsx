"use client";

import Link from "next/link";
import { useState } from "react";
import { SearchBar } from "./SearchBar";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#1A1A2E] text-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <svg viewBox="0 0 32 32" className="w-9 h-9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#C0392B" />
              <rect x="6" y="10" width="20" height="14" rx="2" fill="white" />
              <path d="M6 10 L16 18 L26 10" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinejoin="round" />
              <circle cx="16" cy="13" r="2.5" fill="#C0392B" />
            </svg>
            <div className="leading-tight">
              <div className="font-bold text-base tracking-wide">SG Postal Code</div>
              <div className="text-xs text-red-300 font-medium">Directory</div>
            </div>
          </Link>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <SearchBar compact />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link href="/district/" className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
              Districts
            </Link>
            <Link href="/road/" className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
              Roads
            </Link>
            <Link href="/search/" className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
              Search
            </Link>
            <Link href="/about/" className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
              About
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile search */}
        <div className="md:hidden pb-3">
          <SearchBar compact />
        </div>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#1A1A2E]">
          <nav className="px-4 py-3 flex flex-col gap-1 text-sm font-medium">
            {[
              { href: "/district/", label: "Districts" },
              { href: "/road/", label: "Roads" },
              { href: "/search/", label: "Search" },
              { href: "/about/", label: "About" },
              { href: "/contact/", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
