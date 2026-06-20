import type { Metadata } from "next";
import Link from "next/link";
import { getDistrictStats } from "@/lib/data";
import { getDistrictName } from "@/lib/utils";
import { buildFAQSchema } from "@/lib/faq-schema";
import { FAQAccordion } from "@/components/FAQAccordion";
import { AdBanner } from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "All Singapore Postal Districts — Complete District Directory",
  description:
    "Browse all Singapore postal districts. Find every postal code, building, and address in each district. Complete Singapore district directory from SLA OneMap data.",
  keywords: [
    "singapore postal districts",
    "all singapore districts",
    "singapore district directory",
    "singapore postal district map",
    "singapore district codes",
    "postal district list singapore",
    "sg district lookup",
    "singapore districts list",
    "raffles place district",
    "orchard postal district",
    "singapore 28 districts",
  ],
  alternates: { canonical: "https://www.sgpostalcode.com/district/" },
};

const DISTRICT_FAQS = [
  { q: "How many postal districts are there in Singapore?", a: "Singapore uses postal district codes that range from 01 to 91, with some gaps. This directory covers 84 active districts found in the SLA OneMap verified dataset, each identified by the first two digits of the 6-digit postal code." },
  { q: "What areas are in District 01 (D01)?", a: "District 01 covers Boat Quay, Raffles Place, Cecil, and Marina — the heart of Singapore's Central Business District (CBD). Postal codes in D01 begin with 01XXXX." },
  { q: "Which district is Orchard Road in?", a: "Orchard Road and the surrounding Cairnhill and River Valley areas fall under District 09. This is one of Singapore's most famous shopping and residential districts." },
  { q: "Which district covers Marina Bay Sands?", a: "Marina Bay Sands is located in the Marina Bay area, which falls under District 01 — the Central Business District and Raffles Place district." },
  { q: "How do postal districts differ from planning areas?", a: "Postal districts are a SingPost/SLA construct for mail delivery and address identification. Planning areas (like Bishan, Tampines, Jurong East) are defined by URA for land use planning. They partially overlap but are not the same system." },
  { q: "What does D10 mean in Singapore property listings?", a: "D10 refers to Postal District 10, which covers Balmoral, Bukit Timah, and Holland Village — one of the most prestigious residential districts in Singapore." },
  { q: "Which district has the most postal codes?", a: "High-density residential districts like D18 (Tampines, Pasir Ris) and D19 (Hougang, Punggol, Sengkang) typically have the highest number of postal codes due to large HDB estates." },
  { q: "How do I find all postal codes in a specific district?", a: "Click on any district card on this page to view a complete, searchable list of all postal codes, buildings, and addresses within that district." },
  { q: "Are Singapore postal districts used in property valuations?", a: "Yes. Postal districts (especially D9, D10, D11) are commonly referenced in Singapore real estate to describe property location and price bands." },
  { q: "Which is the largest postal district in Singapore by area?", a: "The outer districts covering areas like Woodlands, Seletar, and Tengah tend to be geographically larger but less dense. District 24 (Lim Chu Kang, Tengah) is among the largest by land area." },
];

export default function DistrictDirectoryPage() {
  const stats = getDistrictStats();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(DISTRICT_FAQS)) }} />

      {/* Header */}
      <div className="bg-[#1A1A2E] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-400 mb-3">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Districts</span>
          </nav>
          <h1 className="text-3xl font-bold">Singapore Postal Districts</h1>
          <p className="text-gray-300 mt-2 max-w-2xl">
            Browse all {stats.length} postal districts. Click any district to see all postal codes, buildings and addresses within it.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ad */}
        <AdBanner slot="2233445566" format="horizontal" className="mb-8" />

        {/* District grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
          {stats.map(({ district, count }) => (
            <Link
              key={district}
              href={`/district/${district}/`}
              className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-[#C0392B] hover:shadow-md transition-all"
            >
              <div className="text-3xl font-bold font-mono text-[#C0392B] mb-1 group-hover:scale-110 transition-transform inline-block">
                {district}
              </div>
              <div className="text-xs font-semibold text-gray-500 mb-1">{count.toLocaleString()} codes</div>
              <div className="text-xs text-gray-400 leading-tight">
                {getDistrictName(district).split(",")[0]}
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <FAQAccordion faqs={DISTRICT_FAQS} />
        </div>
      </div>
    </>
  );
}
