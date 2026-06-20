import type { Metadata } from "next";
import { buildFAQSchema } from "@/lib/faq-schema";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SearchPageClient } from "./SearchPageClient";

export const metadata: Metadata = {
  title: "Search Singapore Postal Codes — Find Any Address, Building or Road",
  description:
    "Search the full Singapore postal code database of 141,726+ addresses. Find postal codes by building name, road, block number, or district. Instant results with maps and copy tools.",
  keywords: [
    "search singapore postal code",
    "find sg postal code",
    "singapore address search",
    "building postal code search",
    "singapore postcode search",
    "lookup postal code singapore",
    "singapore address finder",
    "sg address lookup",
    "postal code by building name singapore",
    "postal code by road name singapore",
    "singapore block number postal code",
    "sg post code search",
  ],
  alternates: { canonical: "https://www.sgpostalcode.com/search/" },
};

const SEARCH_FAQS = [
  { q: "What can I search for on this page?", a: "You can search by postal code (6 digits), building name, road name, block number, or any part of a Singapore address. The search checks all fields simultaneously." },
  { q: "How many records does the search cover?", a: "The search covers the entire SgPostalCode.com database of 141,726+ verified Singapore postal codes sourced from SLA OneMap data." },
  { q: "Why does the search run instantly without loading?", a: "The search index is downloaded once to your browser when you first focus the search bar. Subsequent searches run locally using Fuse.js, giving you instant results without waiting for a server response." },
  { q: "Can I filter search results by district?", a: "After entering a search term, you can narrow results using the district filter to see only codes from a specific postal district (D01–D91)." },
  { q: "How do I search for an HDB flat's postal code?", a: "Type the road name and block number (e.g., 'Blk 123 Tampines Street 11') into the search bar. Matching HDB blocks with their postal codes will appear in the results." },
  { q: "Can I search by MRT station or landmark?", a: "You can search by landmark or building names in our database. For MRT stations, try the station name (e.g., 'Jurong East MRT') to find the postal code of that station building." },
  { q: "Why might one postal code show multiple addresses?", a: "In Singapore, a single postal code may cover multiple units within the same building block. The primary registered address is displayed in this directory." },
  { q: "Is there an API for searching postal codes?", a: "SgPostalCode.com provides JSON data files at /data/ for the search index. For a production API, refer to SLA OneMap's official API at onemap.gov.sg." },
  { q: "How do I find postal codes near a specific location?", a: "Navigate to any postal code's individual page and use the 'Nearby Postal Codes' section to find addresses within 500 metres of that location." },
  { q: "What if I cannot find the address I am looking for?", a: "Try a shorter or alternate spelling of the building name. If the address is very new, it may not yet be in the SLA dataset. For the most current data, check SLA OneMap directly at onemap.gov.sg." },
];

export default function SearchPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(SEARCH_FAQS)) }} />

      {/* Header */}
      <div className="bg-[#1A1A2E] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Search Postal Codes</h1>
          <p className="text-gray-300 mt-2">Search 141,726+ verified Singapore addresses instantly</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchPageClient />

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mt-10">
          <FAQAccordion faqs={SEARCH_FAQS} />
        </div>
      </div>
    </>
  );
}
