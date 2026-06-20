"use client";

export function ContactForm() {
  return (
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">Name</label>
          <input id="name" type="text" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">Email *</label>
          <input id="email" type="email" required className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B]" placeholder="your@email.com" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="subject">Subject *</label>
        <select id="subject" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B] bg-white">
          <option value="">Select a subject…</option>
          <option>Data Error</option>
          <option>Missing Data</option>
          <option>Feature Request</option>
          <option>Business Enquiry</option>
          <option>General Enquiry</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="message">Message *</label>
        <textarea id="message" rows={5} className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C0392B] resize-none" placeholder="Please describe your enquiry in detail…" />
      </div>
      <button type="submit" className="px-6 py-3 bg-[#C0392B] text-white font-semibold rounded-lg hover:bg-[#922b21] transition-colors text-sm">
        Send Message
      </button>
    </form>
  );
}
