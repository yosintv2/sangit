import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllDistricts, getDistrictRecords } from "@/lib/data";
import { getDistrictName, roadToSlug, titleCase } from "@/lib/utils";
import { buildFAQSchema, buildBreadcrumbSchema } from "@/lib/faq-schema";
import { PostalCard } from "@/components/PostalCard";
import { BreadCrumb } from "@/components/BreadCrumb";
import { FAQAccordion } from "@/components/FAQAccordion";
import { AdBanner } from "@/components/AdBanner";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllDistricts().map((id) => ({ id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const areaName = getDistrictName(id);
  return {
    title: `District ${id} Postal Codes — ${areaName}`,
    description: `Browse all postal codes in Singapore District ${id} covering ${areaName}. Complete list of verified addresses with maps and GPS coordinates.`,
    keywords: [
      `district ${id} singapore`,
      `postal district ${id}`,
      `D${id} postal codes`,
      `singapore district ${id} addresses`,
      `district ${id} buildings`,
      `sg D${id}`,
      `district ${id} map singapore`,
      areaName.split(",")[0],
    ],
    alternates: { canonical: `https://www.sgpostalcode.com/district/${id}/` },
  };
}

export default async function DistrictPage({ params }: Props) {
  const { id } = await params;
  const records = getDistrictRecords(id);
  if (records.length === 0) notFound();

  const districtName = getDistrictName(id);
  const uniquePostals = [...new Map(records.map((r) => [r.POSTAL, r])).values()];
  const roads = [...new Set(records.map((r) => r.ROAD_NAME))].sort();

  const faqs = [
    { q: `What areas are covered by Singapore District ${id}?`, a: `District ${id} covers ${districtName}. Browse the address listing below to see all buildings and postal codes in this area.` },
    { q: `How many postal codes are in District ${id}?`, a: `District ${id} contains ${uniquePostals.length.toLocaleString()} unique postal codes covering ${records.length.toLocaleString()} registered addresses.` },
    { q: `What is the postal code prefix for District ${id}?`, a: `Postal codes in District ${id} begin with the digits ${id}, followed by four more digits that identify the specific building or delivery point.` },
    { q: `What are the most well-known buildings in District ${id}?`, a: `Some of the buildings in District ${id} are listed in the address cards below. Use the search bar to find a specific building or road.` },
    { q: `How do I search for a specific address within District ${id}?`, a: `Use the main site search bar or browse the address grid below. All ${uniquePostals.length.toLocaleString()} postal codes in District ${id} are listed here.` },
    { q: `What roads are in District ${id}?`, a: `District ${id} includes ${roads.length} roads. Some of the roads are: ${roads.slice(0, 5).map(titleCase).join(", ")}, and more.` },
    { q: `Is District ${id} mostly residential or commercial?`, a: `Browse the buildings listed below to see the mix of residential, commercial, and industrial addresses in District ${id}.` },
    { q: `How do I find postal codes near a specific address in District ${id}?`, a: `Click on any postal code card to see that address's individual page, which includes a "Nearby Postal Codes" section showing addresses within 500 metres.` },
    { q: `Can I download the full postal code list for District ${id}?`, a: `The postal codes for District ${id} are available to browse on this page. For bulk data, refer to the SLA OneMap API or data.gov.sg open data portal.` },
    { q: `How accurate is the postal code data for District ${id}?`, a: `All data is sourced from SLA OneMap, which is Singapore's authoritative government mapping data. Always verify with SingPost or SLA for critical official use.` },
  ];

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Districts", href: "/district/" },
    { name: `District ${id}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(crumbs.map(c => ({ name: c.name, url: `https://www.sgpostalcode.com${c.href ?? ""}` })))) }} />

      {/* Header */}
      <div className="bg-[#1A1A2E] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-3">
            <BreadCrumb crumbs={crumbs} />
          </div>
          <h1 className="text-3xl font-bold">District {id} Postal Codes</h1>
          <p className="text-gray-300 mt-1">{districtName}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
            <span>{uniquePostals.length.toLocaleString()} unique postal codes</span>
            <span>{roads.length} roads</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdBanner slot="6677889900" format="horizontal" className="mb-8" />

        {/* Roads in this district */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Roads in District {id}</h2>
          <div className="flex flex-wrap gap-2">
            {roads.slice(0, 50).map((road) => (
              <Link
                key={road}
                href={`/road/${roadToSlug(road)}/`}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-[#C0392B] hover:text-[#C0392B] transition-colors"
              >
                {titleCase(road)}
              </Link>
            ))}
            {roads.length > 50 && (
              <span className="px-3 py-1.5 text-sm text-gray-400">+{roads.length - 50} more</span>
            )}
          </div>
        </div>

        {/* Postal codes grid */}
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          All Postal Codes in District {id}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {uniquePostals.slice(0, 150).map((record) => (
            <PostalCard key={record.POSTAL} record={record} compact />
          ))}
        </div>
        {uniquePostals.length > 150 && (
          <p className="text-sm text-gray-500 mb-8">
            Showing first 150 of {uniquePostals.length.toLocaleString()} postal codes. Use the{" "}
            <Link href="/search/" className="text-[#C0392B] underline">search</Link> to find specific addresses.
          </p>
        )}

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <FAQAccordion faqs={faqs} />
        </div>
      </div>
    </>
  );
}
