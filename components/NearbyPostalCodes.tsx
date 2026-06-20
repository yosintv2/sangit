import Link from "next/link";
import { titleCase } from "@/lib/utils";
import type { PostalRecord } from "@/lib/types";

interface Props {
  records: PostalRecord[];
}

export function NearbyPostalCodes({ records }: Props) {
  if (records.length === 0) {
    return (
      <p className="text-sm text-gray-500 italic">
        No nearby postal codes found within 500m.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {records.map((rec) => (
        <Link
          key={rec.POSTAL}
          href={`/postal/${rec.POSTAL.slice(0, 2)}/${rec.POSTAL}/`}
          className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200
            hover:border-[#C0392B] hover:shadow-sm transition-all group"
        >
          <div className="shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#C0392B]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="font-mono text-sm font-bold text-[#C0392B] group-hover:underline">
              {rec.POSTAL}
            </div>
            <div className="text-xs text-gray-700 truncate font-medium">
              {titleCase(rec.BUILDING || rec.SEARCHVAL)}
            </div>
            <div className="text-xs text-gray-400 truncate">{titleCase(rec.ROAD_NAME)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}
