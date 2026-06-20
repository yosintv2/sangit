"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { SearchIndexEntry } from "@/lib/types";
import { SearchBar } from "@/components/SearchBar";
import { AdBanner } from "@/components/AdBanner";

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
    ],
    threshold: 0.3,
    minMatchCharLength: 2,
  });
  return fuseInstance;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [results, setResults] = useState<SearchIndexEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) { setResults([]); setSearched(false); return; }
    setLoading(true);
    setSearched(true);
    try {
      const engine = await getSearchEngine();
      const hits = engine.search(q, { limit: 60 }).map((r) => r.item);
      setResults(hits);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialQ) runSearch(initialQ);
  }, [initialQ, runSearch]);

  return (
    <div>
      <div className="max-w-2xl mb-8">
        <SearchBar placeholder="Search by building, road or postal code…" autoFocus />
      </div>

      <AdBanner slot="4455667788" format="horizontal" className="mb-8" />

      {loading && (
        <div className="flex items-center gap-3 text-gray-500 py-8">
          <div className="w-5 h-5 border-2 border-[#C0392B] border-t-transparent rounded-full animate-spin" />
          <span>Searching…</span>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="font-medium text-lg">No results found</p>
          <p className="text-sm mt-1">Try a different building name, road, or 6-digit postal code</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <>
          <p className="text-sm text-gray-500 mb-4">{results.length} result{results.length !== 1 ? "s" : ""} found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((item) => (
              <Link
                key={item.p}
                href={`/postal/${item.p.slice(0, 2)}/${item.p}/`}
                className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-[#C0392B] hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono text-lg font-bold text-[#C0392B] group-hover:underline">
                    {item.p}
                  </span>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-[#C0392B] shrink-0 transition-colors mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{item.s}</div>
                <div className="text-xs text-gray-500 truncate">{item.r}</div>
              </Link>
            ))}
          </div>
        </>
      )}

      {!searched && !loading && (
        <div className="text-center py-16 text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-lg font-medium text-gray-500">Start typing to search 141,726+ addresses</p>
          <p className="text-sm mt-1">Try a building name, road, or 6-digit postal code</p>
        </div>
      )}
    </div>
  );
}

export function SearchPageClient() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
