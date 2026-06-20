"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";

function EmptyState() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-[#C0392B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Postal Code Lookup</h1>
      <p className="text-gray-500 mb-6">Enter a 6-digit Singapore postal code to find the building, address, and map.</p>
      <SearchBar placeholder="Enter postal code or building name…" autoFocus />
    </div>
  );
}

export function PostalLookupClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = (searchParams.get("code") ?? "").trim();

  useEffect(() => {
    if (/^\d{6}$/.test(code)) {
      router.replace(`/postal/${code.slice(0, 2)}/${code}/`);
    }
  }, [code, router]);

  if (!code) return <EmptyState />;

  return (
    <div className="flex items-center justify-center py-24 gap-3 text-gray-500">
      <div className="w-6 h-6 border-2 border-[#C0392B] border-t-transparent rounded-full animate-spin" />
      <span>Looking up postal code {code}…</span>
    </div>
  );
}
