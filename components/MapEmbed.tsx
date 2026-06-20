import { googleMapsUrl, appleMapsUrl, googleMapsEmbedUrl } from "@/lib/utils";

interface Props {
  lat: string;
  lon: string;
  label: string;
  postal: string;
}

export function MapEmbed({ lat, lon, label, postal }: Props) {
  const embedUrl = googleMapsEmbedUrl(lat, lon);
  const googleUrl = googleMapsUrl(lat, lon, label);
  const appleUrl = appleMapsUrl(lat, lon, label);

  return (
    <div className="space-y-3">
      {/* Map iframe */}
      <div className="map-container rounded-xl overflow-hidden border border-gray-200 shadow-sm">
        <iframe
          src={embedUrl}
          width="100%"
          height="380"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing postal code ${postal} — ${label}`}
          className="block w-full"
          style={{ border: 0 }}
        />
      </div>

      {/* Open in app buttons */}
      <div className="flex flex-wrap gap-3">
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700
            hover:bg-red-50 hover:border-[#C0392B] hover:text-[#C0392B] transition-all shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
          </svg>
          Open in Google Maps
        </a>
        <a
          href={appleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700
            hover:bg-gray-50 transition-all shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Open in Apple Maps
        </a>
      </div>
    </div>
  );
}
