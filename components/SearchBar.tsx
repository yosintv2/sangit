"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { SearchIndexEntry } from "@/lib/types";

interface Props {
  compact?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}

let cachedIndex: SearchIndexEntry[] | null = null;
let fuseInstance: import("fuse.js").default<SearchIndexEntry> | null = null;

async function getSearchEngine() {
  if (fuseInstance) return fuseInstance;

  if (!cachedIndex) {
    const res = await fetch("/data/search-index.json");
    cachedIndex = await res.json();
  }

  const Fuse = (await import("fuse.js")).default;
  fuseInstance = new Fuse(cachedIndex!, {
    keys: [
      { name: "p", weight: 2 },
      { name: "s", weight: 1.5 },
      { name: "a", weight: 1 },
      { name: "r", weight: 0.8 },
      { name: "b", weight: 0.5 },
    ],
    threshold: 0.3,
    minMatchCharLength: 2,
  });
  return fuseInstance;
}

export function SearchBar({ compact = false, placeholder, autoFocus = false }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchIndexEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setResults([]); setOpen(false); return; }
    setLoading(true);
    try {
      const engine = await getSearchEngine();
      const hits = engine.search(q, { limit: 8 }).map((r) => r.item);
      setResults(hits);
      setOpen(hits.length > 0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => search(query), 200);
    return () => clearTimeout(t);
  }, [query, search]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current && !inputRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      if (activeIdx >= 0 && activeIdx < results.length) {
        router.push(`/postal/${results[activeIdx].p.slice(0, 2)}/${results[activeIdx].p}/`);
        setOpen(false);
      } else if (activeIdx === results.length || query.trim()) {
        router.push(`/search/?q=${encodeURIComponent(query.trim())}`);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  const ph = placeholder ?? (compact ? "Search postal codes…" : "Search by building, road, postal code…");

  return (
    <div className={`relative w-full ${compact ? "" : "max-w-2xl"}`}>
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActiveIdx(-1); }}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (results.length > 0) setOpen(true); getSearchEngine(); }}
          placeholder={ph}
          autoFocus={autoFocus}
          autoComplete="off"
          spellCheck={false}
          className={`w-full pl-9 pr-4 rounded-lg border border-gray-200 bg-white text-gray-900
            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C0392B] focus:border-transparent
            transition-shadow ${compact ? "py-2 text-sm" : "py-3 text-base"}`}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[#C0392B] border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50"
        >
          <ul role="listbox">
            {results.map((item, i) => (
              <li key={item.p} role="option" aria-selected={i === activeIdx}>
                <Link
                  href={`/postal/${item.p.slice(0, 2)}/${item.p}/`}
                  onClick={() => setOpen(false)}
                  className={`flex items-start gap-3 px-4 py-3 hover:bg-red-50 transition-colors border-b border-gray-50 last:border-0
                    ${i === activeIdx ? "bg-red-50" : ""}`}
                >
                  <span className="shrink-0 mt-0.5 font-mono text-sm font-semibold text-[#C0392B] bg-red-50 px-2 py-0.5 rounded">
                    {item.p}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{item.s}</div>
                    <div className="text-xs text-gray-500 truncate">{item.r}</div>
                  </div>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`/search/?q=${encodeURIComponent(query)}`}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium text-[#C0392B] hover:bg-red-50 transition-colors
                  ${activeIdx === results.length ? "bg-red-50" : ""}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                View all results for &quot;{query}&quot; →
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
