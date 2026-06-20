import type { Metadata } from "next";
import Link from "next/link";
import { buildFAQSchema } from "@/lib/faq-schema";
import { FAQAccordion } from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Privacy Policy — SgPostalCode.com | How We Handle Your Data",
  description: "Read SgPostalCode.com's privacy policy. We explain what data we collect, how it is used, your rights under PDPA (Singapore) and GDPR, and how we protect your personal information.",
  keywords: ["sgpostalcode privacy policy", "singapore postal code site privacy", "pdpa compliance singapore", "gdpr privacy policy", "sgpostalcode personal data"],
  alternates: { canonical: "https://www.sgpostalcode.com/privacy-policy/" },
  robots: { index: true, follow: true },
};

const PRIVACY_FAQS = [
  { q: "Does SgPostalCode.com collect personal data?", a: "SgPostalCode.com does not require user registration. We collect only standard web analytics data (page views, browser type, approximate location) via cookies. We do not collect names, email addresses, or personal details unless you submit the contact form." },
  { q: "Does this site use cookies?", a: "Yes. We use essential cookies for site functionality and analytics cookies (e.g., Google Analytics) to understand how visitors use the site. You can manage your cookie preferences via the cookie consent banner." },
  { q: "Is SgPostalCode.com compliant with Singapore's PDPA?", a: "Yes. We comply with the Singapore Personal Data Protection Act (PDPA) 2012. We do not collect, use, or disclose personal data beyond what is described in this Privacy Policy." },
  { q: "Does SgPostalCode.com show Google Ads?", a: "Yes. We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your browsing behaviour. You can opt out via Google's Ad Settings at adssettings.google.com." },
  { q: "How long is my data retained?", a: "Contact form submissions are retained for up to 12 months. Analytics data is retained per Google Analytics' default retention period (26 months). No other personal data is retained by us." },
  { q: "Can I request deletion of my data?", a: "Yes. Under PDPA and GDPR, you have the right to request deletion of your personal data held by us. Contact us via the Contact page with a deletion request and we will process it within 30 days." },
  { q: "Does SgPostalCode.com sell personal data?", a: "No. We do not sell, rent, or trade personal data to any third party." },
  { q: "What third-party services does SgPostalCode.com use?", a: "We use Google Analytics (analytics), Google AdSense (advertising), and Google Maps (map embeds). Each of these services has its own privacy policy." },
  { q: "How are my contact form details used?", a: "Information you submit via the contact form is used solely to respond to your enquiry. It is not added to any marketing list or shared with third parties." },
  { q: "Who do I contact about a privacy concern?", a: "Please use the Contact page to submit any privacy-related concern or data access/deletion request. We aim to respond within 10 business days for formal data subject requests." },
];

const EFFECTIVE_DATE = "1 January 2025";

export default function PrivacyPolicyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(PRIVACY_FAQS)) }} />
      <div className="bg-[#1A1A2E] text-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-400 mb-3"><Link href="/" className="hover:text-white">Home</Link><span className="mx-2">›</span><span className="text-white">Privacy Policy</span></nav>
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-gray-400 mt-1 text-sm">Effective date: {EFFECTIVE_DATE}</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 prose prose-gray max-w-none">
          <p className="lead">SgPostalCode.com (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit our website.</p>

          <h2>1. Information We Collect</h2>
          <h3>1.1 Information Collected Automatically</h3>
          <p>When you visit SgPostalCode.com, our servers and third-party analytics tools may automatically collect:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent</li>
            <li>Referring URL</li>
            <li>Approximate geographic location (city/country level)</li>
            <li>IP address (anonymised where possible)</li>
          </ul>

          <h3>1.2 Information You Provide</h3>
          <p>If you submit our contact form, we collect your name, email address, and message content. This information is used solely to respond to your enquiry.</p>

          <h2>2. Cookies</h2>
          <p>We use the following types of cookies:</p>
          <ul>
            <li><strong>Essential cookies</strong>: Required for the site to function correctly.</li>
            <li><strong>Analytics cookies</strong>: Google Analytics helps us understand site usage. Data is anonymised and aggregated.</li>
            <li><strong>Advertising cookies</strong>: Google AdSense may set cookies to serve personalised advertisements based on your interests.</li>
          </ul>
          <p>You may opt out of advertising cookies at any time via <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</p>

          <h2>3. Google AdSense</h2>
          <p>This website uses Google AdSense to display advertisements. Google may use cookies and web beacons to collect information about your interactions with advertisements. For more information, see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</p>

          <h2>4. Singapore PDPA Compliance</h2>
          <p>We comply with the Singapore Personal Data Protection Act 2012 (PDPA). You have the right to access, correct, or withdraw consent for the use of your personal data. To exercise these rights, contact us via the <Link href="/contact/">Contact page</Link>.</p>

          <h2>5. GDPR Rights (EEA Users)</h2>
          <p>If you are located in the European Economic Area, you have the following rights: access, rectification, erasure, restriction of processing, data portability, and the right to object. Contact us to exercise any of these rights.</p>

          <h2>6. Data Retention</h2>
          <p>Contact form submissions are retained for up to 12 months. Analytics data follows Google Analytics&apos; default retention settings.</p>

          <h2>7. Third-Party Services</h2>
          <p>We use Google Analytics, Google AdSense, and Google Maps. Each third-party service operates under its own privacy policy. We are not responsible for the data practices of these third parties.</p>

          <h2>8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>

          <h2>9. Contact</h2>
          <p>For privacy-related enquiries, please use our <Link href="/contact/">Contact page</Link>.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <FAQAccordion faqs={PRIVACY_FAQS} />
        </div>
      </div>
    </>
  );
}
