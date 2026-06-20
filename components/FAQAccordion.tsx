import type { FAQ } from "@/lib/faq-schema";

interface Props {
  faqs: FAQ[];
  title?: string;
}

export function FAQAccordion({ faqs, title = "Frequently Asked Questions" }: Props) {
  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer
              hover:bg-red-50 transition-colors select-none">
              <span className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">
                {faq.q}
              </span>
              <svg
                className="w-5 h-5 text-[#C0392B] shrink-0 transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="px-5 pb-4 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
