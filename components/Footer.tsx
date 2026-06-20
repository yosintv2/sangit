import Link from "next/link";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <circle cx="16" cy="16" r="16" fill="#C0392B" />
                <rect x="6" y="10" width="20" height="14" rx="2" fill="white" />
                <path d="M6 10 L16 18 L26 10" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinejoin="round" />
                <circle cx="16" cy="13" r="2.5" fill="#C0392B" />
              </svg>
              <span className="font-bold text-white">SG Postal Code</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Singapore&apos;s most comprehensive postal code directory with 121,361+ verified addresses.
              Powered by SLA OneMap data.
            </p>
          </div>

          {/* Directory */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Directory</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/district/" className="hover:text-[#C0392B] transition-colors">Browse by District</Link></li>
              <li><Link href="/road/" className="hover:text-[#C0392B] transition-colors">Browse by Road</Link></li>
              <li><Link href="/search/" className="hover:text-[#C0392B] transition-colors">Search Postal Codes</Link></li>
              <li><Link href="/postal/01/018906/" className="hover:text-[#C0392B] transition-colors">Example: 018906</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Information</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about/" className="hover:text-[#C0392B] transition-colors">About Us</Link></li>
              <li><Link href="/contact/" className="hover:text-[#C0392B] transition-colors">Contact</Link></li>
              <li><Link href="/disclaimer/" className="hover:text-[#C0392B] transition-colors">Disclaimer</Link></li>
              <li>
                <a
                  href="https://www.onemap.gov.sg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C0392B] transition-colors"
                >
                  Data: SLA OneMap ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy/" className="hover:text-[#C0392B] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service/" className="hover:text-[#C0392B] transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer/" className="hover:text-[#C0392B] transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <p>© {currentYear} SgPostalCode.com. All rights reserved.</p>
          <p>
            Data sourced from{" "}
            <a
              href="https://www.onemap.gov.sg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 underline"
            >
              SLA OneMap
            </a>
            . Not affiliated with SingPost or the Singapore Government.
          </p>
        </div>
      </div>
    </footer>
  );
}
