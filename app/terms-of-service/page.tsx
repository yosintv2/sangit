import type { Metadata } from "next";
import Link from "next/link";
import { buildFAQSchema } from "@/lib/faq-schema";
import { FAQAccordion } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Terms of Service — SgPostalCode.com | Website Terms & Conditions",
  description: "Read the Terms of Service for SgPostalCode.com. By using this Singapore postal code directory, you agree to these terms covering data use, accuracy, intellectual property, and limitations of liability.",
  keywords: ["sgpostalcode terms of service", "sgpostalcode terms and conditions", "postal code website terms", "sgpostalcode legal"],
  alternates: { canonical: "https://www.sgpostalcode.com/terms-of-service/" },
  robots: { index: true, follow: true },
};

const TERMS_FAQS = [
  { q: "What do I agree to by using SgPostalCode.com?", a: "By accessing or using SgPostalCode.com, you agree to these Terms of Service. If you do not agree, please do not use the site. Your continued use of the site constitutes acceptance of any updated terms." },
  { q: "Can I use the postal code data from this site commercially?", a: "You may use individual postal code lookups for personal or business reference. Bulk scraping, redistribution, or commercial resale of the data is not permitted. The underlying data is owned by SLA and subject to their licensing terms." },
  { q: "Is the postal code data guaranteed to be accurate?", a: "We strive for accuracy using SLA OneMap data, but we make no warranty as to the completeness or accuracy of the data. Always verify critical postal codes with SingPost or SLA for official purposes." },
  { q: "Who owns the content on SgPostalCode.com?", a: "The website design, layout, and original content are owned by SgPostalCode.com. The underlying postal code data is sourced from SLA OneMap and is subject to SLA's data licensing." },
  { q: "Can I scrape or crawl SgPostalCode.com?", a: "Limited crawling by search engine bots is permitted as described in robots.txt. Automated scraping for bulk data collection is not permitted. For bulk data, use the official SLA OneMap API." },
  { q: "Is SgPostalCode.com liable for decisions made based on its data?", a: "No. SgPostalCode.com provides postal code information for reference purposes only. We are not liable for any loss, damage, or harm arising from reliance on data from this site." },
  { q: "What happens if I misuse the website?", a: "We reserve the right to block access to users who engage in excessive automated requests, data scraping, or any activity that disrupts normal service for other users." },
  { q: "Do these terms apply to the mobile version of the site?", a: "Yes. These Terms of Service apply to all versions of SgPostalCode.com, including desktop, mobile, and any future app versions." },
  { q: "Can I link to SgPostalCode.com from my website?", a: "Yes, you may link to any page on SgPostalCode.com. However, framing our pages within your site (using iframes) is not permitted without written consent." },
  { q: "How will I be notified if these terms change?", a: "Changes to the Terms of Service will be posted on this page with an updated effective date. Continued use of the site after changes constitutes acceptance." },
];

export default function TermsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(TERMS_FAQS)) }} />
      <div className="bg-[#1A1A2E] text-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-400 mb-3"><Link href="/" className="hover:text-white">Home</Link><span className="mx-2">›</span><span className="text-white">Terms of Service</span></nav>
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="text-gray-400 mt-1 text-sm">Effective date: 1 January 2025</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 prose prose-gray max-w-none">
          <p className="lead">Please read these Terms of Service carefully before using SgPostalCode.com. By accessing the site, you agree to be bound by these terms.</p>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using SgPostalCode.com, you confirm that you are at least 13 years of age and agree to these Terms of Service and our <Link href="/privacy-policy/">Privacy Policy</Link>.</p>
          <h2>2. Permitted Use</h2>
          <p>You may use SgPostalCode.com for personal, non-commercial reference purposes — including searching, viewing, and copying individual postal codes and addresses for your own use. You must not:</p>
          <ul>
            <li>Systematically scrape, crawl, or download the database</li>
            <li>Redistribute, resell, or commercially exploit the data without SLA authorisation</li>
            <li>Use automated tools to generate bulk requests</li>
            <li>Attempt to circumvent any access restrictions</li>
          </ul>
          <h2>3. Intellectual Property</h2>
          <p>The website design, branding, original text, and code are the intellectual property of SgPostalCode.com. The postal code data is sourced from SLA OneMap and is subject to SLA&apos;s licensing terms.</p>
          <h2>4. Disclaimer of Warranties</h2>
          <p>The information on this site is provided &ldquo;as is&rdquo; without warranties of any kind. We do not warrant that the postal code data is accurate, complete, or current. Always verify critical addresses with SLA or SingPost.</p>
          <h2>5. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, SgPostalCode.com shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this site or reliance on its data.</p>
          <h2>6. Third-Party Links</h2>
          <p>This site contains links to third-party websites (Google Maps, Apple Maps, SLA OneMap). We are not responsible for the content or privacy practices of those sites.</p>
          <h2>7. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the Republic of Singapore.</p>
          <h2>8. Changes to Terms</h2>
          <p>We reserve the right to update these Terms at any time. Continued use of the site after any changes constitutes acceptance of the new terms.</p>
          <h2>9. Contact</h2>
          <p>For questions about these Terms, please contact us via the <Link href="/contact/">Contact page</Link>.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <FAQAccordion faqs={TERMS_FAQS} />
        </div>
      </div>
    </>
  );
}
