import type { Metadata } from "next";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { FAQAccordion } from "@/components/FAQAccordion";
import { AdBanner } from "@/components/AdBanner";
import { getDistrictStats } from "@/lib/data";
import { getDistrictName } from "@/lib/utils";
import { buildFAQSchema } from "@/lib/faq-schema";

export const metadata: Metadata = {
  title: "Singapore Postal Code Directory — Search 141,726+ Verified SG Postal Codes",
  description:
    "Find any Singapore postal code instantly. Search 141,726+ verified addresses by building name, road, district or 6-digit code. Free postal code lookup with maps and GPS coordinates.",
  keywords: [
    "singapore postal code",
    "sg postal code",
    "singapore zip code",
    "postal code singapore",
    "singapore postcode lookup",
    "find postal code singapore",
    "6 digit postal code singapore",
    "singapore address postal code",
    "postal code finder singapore",
    "singapore post code directory",
    "check postal code singapore",
    "all singapore postal codes",
    "sg postal directory",
  ],
  alternates: { canonical: "https://www.sgpostalcode.com/" },
};

const HOME_FAQS = [
  {
    q: "What is a Singapore postal code?",
    a: "A Singapore postal code is a 6-digit number assigned by Singapore Post (SingPost) to uniquely identify every address in Singapore. The first two digits indicate the postal district (01–91), and the remaining four digits identify the specific delivery point.",
  },
  {
    q: "How many postal codes are in Singapore?",
    a: "Singapore has over 121,361 active unique postal codes covering residential, commercial, and industrial buildings across the entire island. This directory lists all verified postal codes sourced from Singapore Land Authority (SLA) OneMap data.",
  },
  {
    q: "How do I find a postal code for an address in Singapore?",
    a: "Use the search bar above and type a building name, road name, or partial address. The directory will show matching results instantly. You can also browse by district or road using the navigation links.",
  },
  {
    q: "What is the format of a Singapore postal code?",
    a: "Singapore postal codes are exactly 6 digits long (e.g., 018906, 238895). There are no letters, hyphens, or spaces. The first two digits represent the postal district.",
  },
  {
    q: "Is a Singapore postal code the same as a ZIP code?",
    a: "Functionally yes — both serve the same purpose of identifying a delivery location. Singapore uses the term 'postal code' rather than 'ZIP code,' which is a term specific to the United States postal system.",
  },
  {
    q: "How often do Singapore postal codes change?",
    a: "Singapore postal codes are very stable and rarely change. New codes are assigned when new buildings are completed. This directory is updated regularly from SLA OneMap data to reflect the latest verified codes.",
  },
  {
    q: "What is the difference between a postal code and a postal district?",
    a: "A postal district is a broader area identified by the first two digits of the postal code. A postal code is more specific — it pinpoints a single building or address within that district.",
  },
  {
    q: "Can I find a postal code by building name?",
    a: "Yes. Type the building name in the search bar (e.g., 'Marina Bay Sands' or 'Raffles Hospital') and matching results will appear immediately from the full directory database.",
  },
  {
    q: "Is this postal code directory free to use?",
    a: "Yes, SgPostalCode.com is completely free. You can search, copy addresses, view maps, and look up nearby codes without creating an account or paying any fees.",
  },
  {
    q: "How accurate is the postal code data on this site?",
    a: "All data is sourced from Singapore Land Authority (SLA) OneMap, which is the authoritative government mapping service for Singapore. Always verify critical postal codes with SingPost or SLA for official purposes.",
  },
];

export default function HomePage() {
  const districtStats = getDistrictStats().slice(0, 28);
  const totalRecords = "141,726+";
  const uniqueCodes = "121,361+";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(HOME_FAQS)) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1A1A2E] via-[#2d2d4e] to-[#C0392B] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-red-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
            Official SLA OneMap Data
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Singapore Postal Code
            <br />
            <span className="text-red-300">Directory</span>
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Search {totalRecords} verified Singapore addresses by building name, road, district or 6-digit postal code.
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <SearchBar placeholder="Search by building, road or postal code…" autoFocus={false} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-lg mx-auto">
            {[
              { value: uniqueCodes, label: "Postal Codes" },
              { value: "84+", label: "Districts" },
              { value: "3,867+", label: "Roads" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-xs text-white/70 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdBanner slot="1234567890" format="horizontal" />
      </div>

      {/* Browse by District */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1A1A2E]">Browse by District</h2>
          <Link href="/district/" className="text-sm font-medium text-[#C0392B] hover:underline">
            View all districts →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {districtStats.map(({ district, count }) => (
            <Link
              key={district}
              href={`/district/${district}/`}
              className="group bg-white rounded-xl border border-gray-200 p-3 text-center hover:border-[#C0392B] hover:shadow-md transition-all"
            >
              <div className="text-2xl font-bold text-[#C0392B] group-hover:scale-110 transition-transform inline-block">
                {district}
              </div>
              <div className="text-xs text-gray-500 mt-1">{count.toLocaleString()} codes</div>
              <div className="text-xs text-gray-400 mt-0.5 leading-tight truncate">
                {getDistrictName(district).split(",")[0]}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How to use */}
      <section className="bg-white border-y border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1A1A2E] text-center mb-8">How to Find a Singapore Postal Code</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
                title: "Search",
                desc: "Type a building name, road, or 6-digit code in the search bar above. Results appear instantly.",
              },
              {
                step: "2",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                ),
                title: "View on Map",
                desc: "See the exact location on Google Maps, get directions, or open in Apple Maps on your device.",
              },
              {
                step: "3",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Copy & Use",
                desc: "Copy the postal code or full address with one click. Find nearby postal codes within 500m.",
              },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center p-5 rounded-xl bg-[#F8F9FA] border border-gray-100">
                <div className="w-12 h-12 rounded-full bg-[#C0392B] text-white flex items-center justify-center mb-4">
                  {icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdBanner slot="0987654321" format="rectangle" />
      </div>

      {/* Popular districts quick-access */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Popular Areas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { district: "09", name: "Orchard Road / Cairnhill", desc: "Shopping belt, luxury residences" },
            { district: "01", name: "Raffles Place / Marina", desc: "CBD, financial district" },
            { district: "10", name: "Bukit Timah / Holland", desc: "Prestigious private estates" },
            { district: "14", name: "Geylang / Eunos", desc: "Heritage, food culture" },
            { district: "18", name: "Tampines / Pasir Ris", desc: "Major HDB town, east" },
            { district: "22", name: "Jurong West", desc: "Industrial, west region" },
          ].map(({ district, name, desc }) => (
            <Link
              key={district}
              href={`/district/${district}/`}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#C0392B] hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                <span className="font-mono font-bold text-[#C0392B] text-lg">D{district}</span>
              </div>
              <div>
                <div className="font-semibold text-gray-900 group-hover:text-[#C0392B] transition-colors text-sm">{name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-t border-gray-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion faqs={HOME_FAQS} />
        </div>
      </section>
    </>
  );
}
