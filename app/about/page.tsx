import type { Metadata } from "next";
import Link from "next/link";
import { buildFAQSchema } from "@/lib/faq-schema";
import { FAQAccordion } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "About SgPostalCode.com — Singapore's Complete Postal Code Directory",
  description:
    "Learn about SgPostalCode.com, Singapore's most comprehensive postal code directory with 141,726+ verified addresses. Powered by SLA OneMap data. Free to use, no registration required.",
  keywords: ["about sgpostalcode.com", "singapore postal code directory", "sg postal code database", "singapore address database", "sla onemap postal codes", "singapore postal code website", "free singapore postal lookup"],
  alternates: { canonical: "https://www.sgpostalcode.com/about/" },
};

const ABOUT_FAQS = [
  { q: "Who runs SgPostalCode.com?", a: "SgPostalCode.com is an independent directory website dedicated to providing free, easy access to Singapore postal code information. It is not affiliated with Singapore Post (SingPost) or the Singapore Land Authority (SLA)." },
  { q: "Where does the postal code data come from?", a: "All postal code data is sourced from the Singapore Land Authority (SLA) OneMap dataset, which is the authoritative government geographic information resource for Singapore." },
  { q: "How often is the data updated?", a: "The database is updated periodically to reflect changes in the SLA OneMap dataset. New buildings and revised addresses are incorporated with each update cycle." },
  { q: "Is SgPostalCode.com free to use?", a: "Yes, this website and all its features — search, maps, address copy, nearby codes — are completely free. No account or subscription is required." },
  { q: "Is SgPostalCode.com affiliated with SingPost or the Singapore government?", a: "No. SgPostalCode.com is an independent third-party directory. For official postal services, visit SingPost at singpost.com. For official mapping data, visit SLA at onemap.gov.sg." },
  { q: "Can I use SgPostalCode.com for commercial purposes?", a: "You may use the website for reference and lookup purposes. For bulk data use or commercial redistribution of the data, you must obtain appropriate licensing from SLA as the authoritative data owner." },
  { q: "How do I report an incorrect postal code or address?", a: "Use the Contact page to submit a report. We will review it against the SLA OneMap source data and update if a discrepancy is confirmed." },
  { q: "Does SgPostalCode.com store personal data?", a: "We do not require registration and do not store personally identifiable information. Please review our Privacy Policy for full details on data handling." },
  { q: "Can I embed or link to SgPostalCode.com pages?", a: "Yes, you are welcome to link to any postal code page on this site. Direct embedding (iframes) of our pages on third-party sites is not permitted without prior written consent." },
  { q: "How can I support or contribute to SgPostalCode.com?", a: "The best way to support us is to share the website with others who need Singapore postal code information. If you spot data errors, report them via the Contact page." },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(ABOUT_FAQS)) }} />
      <div className="bg-[#1A1A2E] text-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-400 mb-3"><Link href="/" className="hover:text-white">Home</Link><span className="mx-2">›</span><span className="text-white">About</span></nav>
          <h1 className="text-3xl font-bold">About SgPostalCode.com</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 prose prose-gray max-w-none">
          <h2>What is SgPostalCode.com?</h2>
          <p>SgPostalCode.com is Singapore&apos;s most comprehensive free postal code directory, providing instant access to 141,726+ verified addresses across the entire island. Our mission is to make Singapore postal code lookup simple, fast, and free for everyone — whether you need to verify a delivery address, find a building location, or explore a neighbourhood.</p>
          <h2>Our Data Source</h2>
          <p>All postal code data is sourced from the <strong>Singapore Land Authority (SLA) OneMap</strong> dataset — the authoritative government geographic information system for Singapore. The data is downloaded and processed at build time, ensuring the website loads instantly with no external API calls during browsing.</p>
          <h2>What We Offer</h2>
          <ul>
            <li>121,361+ unique Singapore postal codes with full address details</li>
            <li>Google Maps and Apple Maps integration for every address</li>
            <li>One-click copy for postal codes and full addresses</li>
            <li>Nearby postal codes within 500 metres</li>
            <li>Browse by district (D01–D91) or road name (3,867 roads)</li>
            <li>Full-text search across the entire database</li>
          </ul>
          <h2>Independent Service</h2>
          <p>SgPostalCode.com is not affiliated with SingPost, the Singapore Land Authority, or any Singapore government body. For official postal services, visit <a href="https://www.singpost.com" target="_blank" rel="noopener noreferrer">singpost.com</a>. For authoritative mapping data, visit <a href="https://www.onemap.gov.sg" target="_blank" rel="noopener noreferrer">onemap.gov.sg</a>.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <FAQAccordion faqs={ABOUT_FAQS} />
        </div>
      </div>
    </>
  );
}
