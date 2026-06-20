import type { Metadata } from "next";
import Link from "next/link";
import { buildFAQSchema } from "@/lib/faq-schema";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — SgPostalCode.com | Report Errors or Send Enquiries",
  description: "Contact SgPostalCode.com to report incorrect postal codes, suggest improvements, or make general enquiries about Singapore's postal code directory. We aim to respond within 2 business days.",
  keywords: ["contact sgpostalcode", "sgpostalcode.com contact", "report postal code error singapore", "singapore postal code correction", "sgpostalcode enquiry", "postal code error report"],
  alternates: { canonical: "https://www.sgpostalcode.com/contact/" },
};

const CONTACT_FAQS = [
  { q: "How do I report a wrong postal code on SgPostalCode.com?", a: "Use the contact form on this page and select 'Data Error' as the subject. Provide the incorrect postal code, the wrong information shown, and the correct information if you know it. We will verify against SLA OneMap and update." },
  { q: "How long does it take to get a response?", a: "We aim to respond to all enquiries within 2 Singapore business days (Monday–Friday, excluding public holidays). Data correction requests may take longer as they require verification." },
  { q: "Can I request a new feature for the website?", a: "Yes. Select 'Feature Request' in the contact form subject. We welcome suggestions that improve the directory for all users." },
  { q: "Can I request bulk postal code data for a research project?", a: "For bulk data use, we recommend consulting the official SLA OneMap API at onemap.gov.sg or the data.gov.sg open data portal, which provide official Singapore government datasets under open data licences." },
  { q: "I found a building that is missing from the directory. How do I add it?", a: "Use the contact form and select 'Missing Data.' Provide the building name, address, and postal code. We will cross-check with SLA OneMap. Only addresses officially registered with SLA can be added." },
  { q: "How do I contact you about advertising or partnerships?", a: "Select 'Business Enquiry' in the contact form. Please include details about your organisation and the nature of the partnership you are proposing." },
  { q: "Can I reach SgPostalCode.com by phone?", a: "At this time, SgPostalCode.com only accepts enquiries via the contact form. We do not publish a phone number." },
  { q: "Is my contact form submission private?", a: "Yes. Information submitted through the contact form is used solely for responding to your enquiry and is not shared with third parties. See our Privacy Policy for full details." },
  { q: "I am a developer — can I access an API for postal code data?", a: "SgPostalCode.com publishes JSON data files for the search index at /data/search-index.json. For production-grade API access, refer to SLA OneMap's official API at onemap.gov.sg." },
  { q: "What should I do if the contact form is not working?", a: "If you experience issues with the form, please ensure JavaScript is enabled in your browser. We are continually improving the site — try refreshing the page." },
];

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(CONTACT_FAQS)) }} />
      <div className="bg-[#1A1A2E] text-white py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-400 mb-3"><Link href="/" className="hover:text-white">Home</Link><span className="mx-2">›</span><span className="text-white">Contact</span></nav>
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="text-gray-300 mt-2">Report errors, suggest features, or send general enquiries</p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
          <ContactForm />
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <FAQAccordion faqs={CONTACT_FAQS} />
        </div>
      </div>
    </>
  );
}
