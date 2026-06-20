import type { Metadata } from "next";
import Link from "next/link";
import { getRoadsIndex } from "@/lib/data";
import { titleCase } from "@/lib/utils";
import { buildFAQSchema } from "@/lib/faq-schema";
import { FAQAccordion } from "@/components/FAQAccordion";
import { AdBanner } from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Singapore Roads A–Z — Browse Postal Codes by Road Name",
  description:
    "Browse every Singapore road and street alphabetically. Find all postal codes, building numbers, and addresses on any road in Singapore. Complete A–Z Singapore road directory.",
  keywords: [
    "singapore road directory",
    "singapore street list",
    "singapore road names",
    "road postal codes singapore",
    "singapore street postal code",
    "find road singapore",
    "all singapore roads",
    "sg street directory",
    "singapore road address lookup",
    "singapore road names list a-z",
    "singapore road finder",
    "street finder singapore",
  ],
  alternates: { canonical: "https://www.sgpostalcode.com/road/" },
};

const ROAD_FAQS = [
  { q: "How many named roads are there in Singapore?", a: "This directory indexes 3,867 roads that have at least one registered postal code in the SLA OneMap dataset, giving you the most complete Singapore road listing available." },
  { q: "What is the difference between a Road, Avenue, Street, and Drive in Singapore?", a: "These are different suffixes used for Singapore roads — there is no strict rule on which type of road gets each suffix. They are assigned historically and do not indicate road size or importance." },
  { q: "How do I find all postal codes on a specific road?", a: "Click the road name in the A–Z listing below to see every building and postal code registered on that road, sorted by block number." },
  { q: "What is Orchard Road's postal code area?", a: "Orchard Road spans multiple postal codes within District 09. Click 'Orchard Road' in the listing below for the full list of buildings and codes." },
  { q: "Why do some roads have very few postal codes?", a: "Roads in private residential estates or cul-de-sacs may serve only a handful of bungalows. Large roads in HDB towns like Tampines Street or Bedok North have hundreds of registered codes." },
  { q: "Are all Singapore roads in this directory?", a: "This directory includes all roads that appear in the SLA OneMap verified postal code dataset, covering the entire Singapore island including Sentosa, Jurong Island, and the northern townships." },
  { q: "Can I find a road by typing part of its name?", a: "Yes — use the main search bar at the top of the site. Type a partial road name and matching roads and postal codes will appear in the results." },
  { q: "What is a 'Crescent' vs a 'Close' in Singapore road naming?", a: "In Singapore, a 'Crescent' is typically a curved road, and a 'Close' is usually a short, dead-end road. Both are used in residential areas following UK-influenced conventions." },
  { q: "Are lane names and back-lane addresses included?", a: "This directory focuses on primary postal addresses as registered with SLA. Some service lanes or non-addressed roads may not appear if they do not have registered postal code delivery points." },
  { q: "How do I report a road name or address that appears wrong?", a: "Please use the Contact page to report errors. We will cross-reference with the SLA OneMap data and update accordingly. Official corrections must originate from SLA." },
];

export default function RoadDirectoryPage() {
  const roadsIndex = getRoadsIndex();
  const roads = Object.values(roadsIndex).sort((a, b) => a.name.localeCompare(b.name));

  // Group by first letter
  const byLetter: Record<string, typeof roads> = {};
  for (const road of roads) {
    const letter = road.name[0]?.toUpperCase() || "#";
    if (!byLetter[letter]) byLetter[letter] = [];
    byLetter[letter].push(road);
  }
  const letters = Object.keys(byLetter).sort();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(ROAD_FAQS)) }} />

      {/* Header */}
      <div className="bg-[#1A1A2E] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-400 mb-3">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-white">Roads</span>
          </nav>
          <h1 className="text-3xl font-bold">Singapore Roads A–Z</h1>
          <p className="text-gray-300 mt-2">{roads.length.toLocaleString()} roads with verified postal codes</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdBanner slot="1029384756" format="horizontal" className="mb-8" />

        {/* Alphabet jump nav */}
        <div className="flex flex-wrap gap-2 mb-8 sticky top-16 bg-[#F8F9FA] py-3 z-10">
          {letters.map((l) => (
            <a
              key={l}
              href={`#letter-${l}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-sm font-bold text-[#C0392B] hover:bg-[#C0392B] hover:text-white hover:border-[#C0392B] transition-colors"
            >
              {l}
            </a>
          ))}
        </div>

        {/* Road listings by letter */}
        {letters.map((letter) => (
          <div key={letter} id={`letter-${letter}`} className="mb-10">
            <h2 className="text-2xl font-bold text-[#1A1A2E] border-b-2 border-[#C0392B] pb-2 mb-4 inline-block pr-8">
              {letter}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {byLetter[letter].map((road) => (
                <Link
                  key={road.slug}
                  href={`/road/${road.slug}/`}
                  className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200
                    hover:border-[#C0392B] hover:shadow-sm transition-all group"
                >
                  <span className="text-sm font-medium text-gray-800 group-hover:text-[#C0392B] transition-colors">
                    {titleCase(road.name)}
                  </span>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">{road.count} codes</span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mt-4">
          <FAQAccordion faqs={ROAD_FAQS} />
        </div>
      </div>
    </>
  );
}
