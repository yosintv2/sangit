import type { Metadata } from "next";
import Link from "next/link";
import { buildFAQSchema } from "@/lib/faq-schema";
import { FAQAccordion } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Disclaimer — SgPostalCode.com | Data Accuracy & Liability Notice",
  description: "Important disclaimer for SgPostalCode.com. Postal code data is for reference only. Always verify addresses with SingPost or SLA for official use. SgPostalCode.com is not affiliated with the Singapore government.",
  keywords: ["sgpostalcode disclaimer", "postal code accuracy disclaimer", "singapore postal code accuracy", "sgpostalcode liability", "postal code reference only", "sgpostalcode not official"],
  alternates: { canonical: "https://www.sgpostalcode.com/disclaimer/" },
};

const DISCLAIMER_FAQS = [
  { q: "Is SgPostalCode.com an official Singapore government website?", a: "No. SgPostalCode.com is an independent, privately operated directory website. It is not affiliated with, endorsed by, or operated by the Singapore government, SingPost, SLA, or any other government body." },
  { q: "Can I use postal codes from this site in official documents?", a: "Postal codes shown on this site are sourced from SLA OneMap and are generally accurate. However, for official legal, commercial, or government documents, always verify the postal code directly with SLA or SingPost." },
  { q: "What if I received a letter or parcel returned due to a wrong postal code from this site?", a: "SgPostalCode.com provides data for reference only and accepts no liability for delivery failures. Please verify delivery addresses with SingPost directly before sending important mail." },
  { q: "How current is the postal code data?", a: "Data is updated periodically from SLA OneMap. Very new buildings (completed within the past few months) may not yet be listed. For the most current data, check SLA OneMap at onemap.gov.sg." },
  { q: "Why might a postal code on this site differ from SingPost's system?", a: "Minor discrepancies can occur if the SLA OneMap data has been updated since our last data refresh. The SLA and SingPost are the authoritative sources. We work to keep our data as current as possible." },
  { q: "Are map locations on this site accurate?", a: "Map locations are based on GPS coordinates provided in the SLA OneMap dataset. Minor inaccuracies can occur, particularly for large or multi-building complexes. Always confirm navigation via Google Maps or a navigation app." },
  { q: "Does SgPostalCode.com take responsibility for errors in the SLA data?", a: "No. Errors that originate in the SLA OneMap source data are beyond our control. We present the data as received from SLA. Report suspected errors to SLA at onemap.gov.sg." },
  { q: "Can this site be used for emergency services dispatch?", a: "No. SgPostalCode.com is a reference directory and must not be used for emergency services, 999 calls, or critical safety situations. For emergencies, dial 999 and describe your location verbally." },
  { q: "Is the nearby postal codes feature precise?", a: "The nearby codes feature uses mathematical Haversine distance calculated from GPS coordinates. It is approximate and may include or exclude addresses near the boundary due to roads, water bodies, and physical barriers." },
  { q: "What should I do if I believe data on this site has caused harm?", a: "SgPostalCode.com provides an information service only. Our liability is limited as described in the Terms of Service. For data corrections, please use the Contact page." },
];

export default function DisclaimerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(DISCLAIMER_FAQS)) }} />
      <div className="bg-[#1A1A2E] text-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-400 mb-3"><Link href="/" className="hover:text-white">Home</Link><span className="mx-2">›</span><span className="text-white">Disclaimer</span></nav>
          <h1 className="text-3xl font-bold">Disclaimer</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-amber-800">Important Notice</p>
              <p className="text-sm text-amber-700 mt-1">SgPostalCode.com is not an official Singapore government website. All postal code data is provided for reference purposes only. Always verify critical addresses with <a href="https://www.singpost.com" className="underline" target="_blank" rel="noopener noreferrer">SingPost</a> or <a href="https://www.onemap.gov.sg" className="underline" target="_blank" rel="noopener noreferrer">SLA OneMap</a>.</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 prose prose-gray max-w-none">
          <h2>1. Not an Official Government Website</h2>
          <p>SgPostalCode.com is an independent, privately operated directory website. It is not affiliated with, endorsed by, or operated by the Government of Singapore, the Singapore Land Authority (SLA), Singapore Post (SingPost), or any other government agency.</p>
          <h2>2. Data Accuracy</h2>
          <p>Postal code data is sourced from SLA OneMap and processed at build time. While we strive for accuracy, we make no warranties regarding the completeness, accuracy, or currency of the data. Data may not reflect the most recent changes.</p>
          <h2>3. No Liability</h2>
          <p>SgPostalCode.com expressly disclaims all liability for any loss, damage, or inconvenience arising from reliance on information published on this site. This includes, without limitation, delivery failures, navigation errors, or administrative errors in official documents.</p>
          <h2>4. Emergency Services</h2>
          <p>This website must not be used for emergency services, 999 calls, or any safety-critical situation. For emergencies in Singapore, call 999 (Police/Fire/Ambulance) and describe your location verbally.</p>
          <h2>5. Authoritative Sources</h2>
          <p>For official, verified Singapore postal codes, consult:</p>
          <ul>
            <li><a href="https://www.onemap.gov.sg" target="_blank" rel="noopener noreferrer">SLA OneMap</a> — official government geographic data</li>
            <li><a href="https://www.singpost.com" target="_blank" rel="noopener noreferrer">SingPost</a> — official postal service</li>
          </ul>
          <h2>6. External Links</h2>
          <p>This site links to Google Maps and Apple Maps for navigation. We are not responsible for the accuracy or availability of those third-party services.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <FAQAccordion faqs={DISCLAIMER_FAQS} />
        </div>
      </div>
    </>
  );
}
