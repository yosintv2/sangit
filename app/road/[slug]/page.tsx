import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllRoadSlugs, getRoadRecords, getRoadsIndex } from "@/lib/data";
import { titleCase, districtFromPostal, getDistrictName } from "@/lib/utils";
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/faq-schema";
import { PostalCard } from "@/components/PostalCard";
import { BreadCrumb } from "@/components/BreadCrumb";
import { FAQAccordion } from "@/components/FAQAccordion";
import { AdBanner } from "@/components/AdBanner";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllRoadSlugs().map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const roadsIndex = getRoadsIndex();
  const roadInfo = roadsIndex[slug];
  if (!roadInfo) return {};

  const roadName = titleCase(roadInfo.name);
  return {
    title: `${roadName} Postal Codes — All Buildings & Addresses | Singapore`,
    description: `Browse all ${roadInfo.count} postal codes on ${roadName}, Singapore. Complete list of buildings, block numbers, and addresses sorted by block number. View maps and copy addresses.`,
    keywords: [
      `${roadName} postal code`,
      `${roadName} singapore address`,
      `${roadName} buildings`,
      `postal code ${roadName} singapore`,
      `${roadName.toLowerCase()} postal directory`,
      `${roadName} map`,
      `address lookup ${roadName}`,
      `${slug} postal code`,
    ],
    alternates: { canonical: `https://www.sgpostalcode.com/road/${slug}/` },
  };
}

export default async function RoadPage({ params }: Props) {
  const { slug } = await params;
  const records = getRoadRecords(slug);
  if (records.length === 0) notFound();

  const roadName = titleCase(records[0].ROAD_NAME);
  const sorted = [...records].sort((a, b) => {
    const na = parseInt(a.BLK_NO) || 0;
    const nb = parseInt(b.BLK_NO) || 0;
    return na - nb;
  });
  const uniqueByPostal = [...new Map(sorted.map((r) => [r.POSTAL, r])).values()];

  const districts = [...new Set(records.map((r) => districtFromPostal(r.POSTAL)))];

  const faqs = [
    { q: `How many postal codes are on ${roadName}?`, a: `There are ${uniqueByPostal.length} registered postal codes on ${roadName}, Singapore, covering a range of residential and commercial buildings.` },
    { q: `What district is ${roadName} in?`, a: `${roadName} falls within Singapore Postal District${districts.length > 1 ? "s" : ""} ${districts.map(d => `${d} (${getDistrictName(d).split(",")[0]})`).join(", ")}.` },
    { q: `What is the first and last block number on ${roadName}?`, a: `Block numbers on ${roadName} are listed in the table below, sorted numerically. The full list is shown in order of block number.` },
    { q: `How do I find a specific unit's postal code on ${roadName}?`, a: `All registered postal codes on ${roadName} are listed below by block number. Each entry shows the building name, block number, and full postal code.` },
    { q: `Can I view all postal codes on ${roadName} on a map?`, a: `Click any postal code in the list below to open its individual page, which includes a Google Maps embed and an Apple Maps button for that specific address.` },
    { q: `Why does the block numbering on ${roadName} skip some numbers?`, a: "Block numbers in Singapore are not always consecutive. Numbers may have been reserved, retired, or renumbered when buildings were demolished or rebuilt." },
    { q: `How do I copy an address from ${roadName}'s listings?`, a: `Click on any postal code to open its detail page. There you will find copy buttons for both the postal code and the full formatted address.` },
    { q: `Are all buildings on ${roadName} listed here?`, a: `This directory lists all buildings on ${roadName} that have a registered postal code in the SLA OneMap dataset. Newly completed buildings may not yet appear.` },
    { q: `What types of buildings are on ${roadName}?`, a: `The listings below show the building names for all registered postal codes on ${roadName}. They include a mix of residential, commercial, and other property types.` },
    { q: `Is ${roadName} in central, east, west or north Singapore?`, a: `Based on the postal district${districts.length > 1 ? "s" : ""} (${districts.join(", ")}), ${roadName} is in the ${districts.map(d => getDistrictName(d).split(",")[0]).join(" / ")} area of Singapore.` },
  ];

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Roads", href: "/road/" },
    { name: roadName },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(crumbs.map(c => ({ name: c.name, url: `https://www.sgpostalcode.com${c.href ?? ""}` })))) }} />

      {/* Header */}
      <div className="bg-[#1A1A2E] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-3"><BreadCrumb crumbs={crumbs} /></div>
          <h1 className="text-3xl font-bold">{roadName}</h1>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-300">
            <span>{uniqueByPostal.length} postal codes</span>
            {districts.map((d) => (
              <Link key={d} href={`/district/${d}/`} className="hover:text-white underline">
                District {d} — {getDistrictName(d).split(",")[0]}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdBanner slot="9988776655" format="horizontal" className="mb-8" />

        <h2 className="text-lg font-bold text-gray-900 mb-4">
          All {uniqueByPostal.length} Postal Codes on {roadName}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {uniqueByPostal.map((record) => (
            <PostalCard key={record.POSTAL} record={record} showCopy />
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <FAQAccordion faqs={faqs} />
        </div>
      </div>
    </>
  );
}
