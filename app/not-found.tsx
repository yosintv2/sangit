"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const pathname = usePathname();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const path = pathname || window.location.pathname;
    // /postal/049409 → /postal/04/049409/
    const match = path.match(/^\/postal\/(\d{6})\/?$/);
    if (match) {
      setRedirecting(true);
      const code = match[1];
      router.replace(`/postal/${code.slice(0, 2)}/${code}/`);
    }
  }, [pathname, router]);

  if (redirecting) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Redirecting…</p>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-[#C0392B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-3">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mb-8">
        The postal code or page you&apos;re looking for doesn&apos;t exist in our directory.
        This may be a very new address not yet in the SLA dataset.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="px-5 py-2.5 bg-[#C0392B] text-white font-semibold rounded-lg hover:bg-[#922b21] transition-colors text-sm">
          Go Home
        </Link>
        <Link href="/search/" className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-[#C0392B] hover:text-[#C0392B] transition-colors text-sm">
          Search Directory
        </Link>
      </div>
    </div>
  );
}
