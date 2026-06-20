import { readFileSync } from "fs";
import { join } from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getNearby } from "@/lib/geo";
import { getDistrictName, titleCase, formatAddress, roadToSlug } from "@/lib/utils";
import { buildFAQSchema, buildBreadcrumbSchema, buildPlaceSchema } from "@/lib/faq-schema";
import type { PostalRecord } from "@/lib/types";
import { BreadCrumb } from "@/components/BreadCrumb";
import { CopyButton } from "@/components/CopyButton";
import { MapEmbed } from "@/components/MapEmbed";
import { NearbyPostalCodes } from "@/components/NearbyPostalCodes";
import { FAQAccordion } from "@/components/FAQAccordion";
import { AdBanner } from "@/components/AdBanner";

type DistrictData = { [postal: string]: PostalRecord };
type Props = { params: Promise<{ district: string; code: string }> };

const POSTAL_DIR = join(process.cwd(), "public", "data", "postal");

function loadDistrict(district: string): DistrictData {
  return JSON.parse(readFileSync(join(POSTAL_DIR, `${district}.json`), "utf-8"));
}

// Parent layout provides district params; we add code params per district.
// Each call receives parentParams = { district: 'XX' } and returns codes for that district only.
// This keeps each result set small (~500-2000), avoiding the spread-121k stack overflow.
export async function generateStaticParams({ params }: { params: { district: string } }) {
  try {
    const data = loadDistrict(params.district);
    return Object.keys(data).map((code) => ({ code }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { district, code } = await params;
  try {
    const record = loadDistrict(district)[code];
    if (!record) return { title: `${code} | SgPostalCode.com` };
    const building = titleCase(record.BUILDING || record.SEARCHVAL);
    const road = titleCase(record.ROAD_NAME);
    const desc = `Postal code ${code}: ${building}, ${road}, Singapore. View full address, GPS coordinates, map, and nearby postal codes.`;
    return {
      title: `${code} Postal Code — ${building} | SgPostalCode.com`,
      description: desc,
      alternates: { canonical: `https://www.sgpostalcode.com/postal/${district}/${code}/` },
      openGraph: {
        title: `Singapore Postal Code ${code} — ${building}`,
        description: desc,
        url: `https://www.sgpostalcode.com/postal/${district}/${code}/`,
        type: "website",
      },
    };
  } catch {
    return { title: `${code} | SgPostalCode.com` };
  }
}

export default async function PostalCodePage({ params }: Props) {
  const { district, code } = await params;

  let record: PostalRecord | undefined;
  let districtData: DistrictData = {};
  try {
    districtData = loadDistrict(district);
    record = districtData[code];
  } catch {
    notFound();
  }
  if (!record) notFound();

  const districtName = getDistrictName(district);
  const building = titleCase(record.BUILDING || record.SEARCHVAL);
  const road = titleCase(record.ROAD_NAME);
  const roadSlug = roadToSlug(record.ROAD_NAME);
  const fullAddress = formatAddress({
    BLK_NO: record.BLK_NO,
    ROAD_NAME: record.ROAD_NAME,
    BUILDING: record.BUILDING,
    POSTAL: record.POSTAL,
  });

  const lat = parseFloat(record.LATITUDE);
  const lon = parseFloat(record.LONGITUDE);
  const hasCoords = !isNaN(lat) && !isNaN(lon);

  const nearbyRecords = hasCoords
    ? getNearby(Object.values(districtData), lat, lon, code, 500, 12)
    : [];

  const faqs = [
    { q: `What building or location does postal code ${code} refer to?`, a: `Postal code ${code} is assigned to ${building}, located at Block ${record.BLK_NO || "—"} ${road}, Singapore ${code}.` },
    { q: `What is the full address for postal code ${code}?`, a: `The full registered address is: ${record.ADDRESS}, Singapore ${code}.` },
    { q: `Which postal district does ${code} belong to?`, a: `Postal code ${code} belongs to Singapore Postal District ${district}, which covers the ${districtName} area.` },
    { q: `What are the GPS coordinates for postal code ${code}?`, a: hasCoords ? `The GPS coordinates for ${code} are Latitude ${record.LATITUDE} and Longitude ${record.LONGITUDE}.` : `GPS coordinates are not available for this postal code.` },
    { q: `How do I get directions to postal code ${code}?`, a: `Click the "Open in Google Maps" or "Open in Apple Maps" button on this page to navigate directly to ${building}.` },
    { q: `What is the block number for postal code ${code}?`, a: record.BLK_NO && record.BLK_NO !== "0" ? `The block number is ${record.BLK_NO}. The full street address is Block ${record.BLK_NO} ${road}, Singapore ${code}.` : `This address does not have a block number — it is a named building at ${road}.` },
    { q: `Are there nearby postal codes to ${code}?`, a: `The "Nearby Postal Codes" section on this page shows addresses within 500 metres of ${code}.` },
    { q: `What road is postal code ${code} on?`, a: `Postal code ${code} is located on ${road}. Browse all postal codes on ${road} using the road directory link.` },
    { q: `How do I copy postal code ${code} or its full address?`, a: `Click the clipboard icon next to the postal code or the full address field to copy it instantly to your clipboard.` },
    { q: `What district is postal code ${code} in?`, a: `Postal code ${code} is in District ${district} (${districtName}). Browse all codes in this district via the District ${district} link.` },
  ];

  const crumbs = [
    { name: "Home", href: "/" },
    { name: `District ${district}`, href: `/district/${district}/` },
    { name: road, href: `/road/${roadSlug}/` },
    { name: code },
  ];

  const faqSchema = buildFAQSchema(faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "https://www.sgpostalcode.com/" },
    { name: `District ${district}`, url: `https://www.sgpostalcode.com/district/${district}/` },
    { name: road, url: `https://www.sgpostalcode.com/road/${roadSlug}/` },
    { name: code, url: `https://www.sgpostalcode.com/postal/${district}/${code}/` },
  ]);
  const placeSchema = buildPlaceSchema(record);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-5"><BreadCrumb crumbs={crumbs} /></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Hero card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-[#1A1A2E] to-[#C0392B] px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-red-200 text-xs font-semibold uppercase tracking-wider mb-1">Singapore Postal Code</div>
                    <div className="text-4xl font-mono font-bold text-white tracking-widest">{code}</div>
                  </div>
                  <CopyButton text={code} label="postal code" className="shrink-0 mt-1" />
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h1 className="text-xl font-bold text-gray-900 leading-snug">{building}</h1>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Block No.</dt>
                    <dd className="text-gray-900 font-medium">{record.BLK_NO || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Road Name</dt>
                    <dd><Link href={`/road/${roadSlug}/`} className="text-[#C0392B] font-medium hover:underline">{road}</Link></dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">District</dt>
                    <dd>
                      <Link href={`/district/${district}/`} className="text-[#C0392B] font-medium hover:underline">
                        District {district} — {districtName.split(",")[0]}
                      </Link>
                    </dd>
                  </div>
                  {hasCoords && (
                    <div>
                      <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Coordinates</dt>
                      <dd className="text-gray-900 font-mono text-xs">{record.LATITUDE}, {record.LONGITUDE}</dd>
                    </div>
                  )}
                </dl>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Full Address</div>
                      <p className="text-sm text-gray-800 font-medium leading-relaxed">{fullAddress}</p>
                    </div>
                    <CopyButton text={fullAddress} label="address" className="shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            {hasCoords && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Location Map</h2>
                <MapEmbed lat={record.LATITUDE} lon={record.LONGITUDE} label={building} postal={code} />
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Nearby Postal Codes
                <span className="ml-2 text-sm font-normal text-gray-500">within 500m</span>
              </h2>
              <NearbyPostalCodes records={nearbyRecords} />
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <FAQAccordion faqs={faqs} />
            </div>
          </div>

          <aside className="space-y-6">
            <AdBanner slot="1122334455" format="rectangle" />
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/district/${district}/`} className="flex items-center gap-2 text-[#C0392B] hover:underline">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    All codes in District {district}
                  </Link>
                </li>
                <li>
                  <Link href={`/road/${roadSlug}/`} className="flex items-center gap-2 text-[#C0392B] hover:underline">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    All codes on {road}
                  </Link>
                </li>
                <li>
                  <Link href="/search/" className="flex items-center gap-2 text-[#C0392B] hover:underline">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    Search all postal codes
                  </Link>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-5 text-sm text-blue-800">
              <div className="flex gap-2">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p>Data sourced from <a href="https://www.onemap.gov.sg" target="_blank" rel="noopener noreferrer" className="font-medium underline">SLA OneMap</a>. For critical use, verify with SingPost or SLA.</p>
              </div>
            </div>
            <AdBanner slot="5544332211" format="vertical" />
          </aside>
        </div>
      </div>
    </>
  );
}
