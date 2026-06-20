import Link from "next/link";
import { CopyButton } from "./CopyButton";
import { titleCase } from "@/lib/utils";
import type { PostalRecord } from "@/lib/types";

interface Props {
  record: PostalRecord;
  showCopy?: boolean;
  compact?: boolean;
}

export function PostalCard({ record, showCopy = false, compact = false }: Props) {
  const building = titleCase(record.BUILDING || record.SEARCHVAL);
  const road = titleCase(record.ROAD_NAME);

  if (compact) {
    return (
      <Link
        href={`/postal/${record.POSTAL.slice(0, 2)}/${record.POSTAL}/`}
        className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-[#C0392B] hover:shadow-md transition-all group"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <span className="font-mono text-sm font-bold text-[#C0392B] group-hover:underline">
              {record.POSTAL}
            </span>
            <p className="text-xs text-gray-600 mt-0.5 truncate">{building}</p>
            <p className="text-xs text-gray-400 truncate">{road}</p>
          </div>
          <svg className="w-4 h-4 text-gray-300 group-hover:text-[#C0392B] shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <Link href={`/postal/${record.POSTAL.slice(0, 2)}/${record.POSTAL}/`} className="group">
            <span className="font-mono text-xl font-bold text-[#C0392B] group-hover:underline postal-code">
              {record.POSTAL}
            </span>
          </Link>
          {showCopy && <CopyButton text={record.POSTAL} label="postal code" />}
        </div>

        <h3 className="font-semibold text-gray-900 text-base mb-1 leading-snug">
          <Link href={`/postal/${record.POSTAL.slice(0, 2)}/${record.POSTAL}/`} className="hover:text-[#C0392B] transition-colors">
            {building}
          </Link>
        </h3>

        <div className="space-y-1 text-sm text-gray-600">
          {record.BLK_NO && record.BLK_NO !== "0" && (
            <div className="flex items-center gap-1.5">
              <span className="text-gray-400">Block</span>
              <span className="font-medium">{record.BLK_NO}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <Link href={`/road/${record.ROAD_NAME.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}/`}
              className="hover:text-[#C0392B] transition-colors">
              {road}
            </Link>
          </div>
        </div>

        {showCopy && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
            <span className="text-xs text-gray-500 flex-1 truncate">{record.ADDRESS}</span>
            <CopyButton text={record.ADDRESS} label="address" />
          </div>
        )}
      </div>
    </div>
  );
}
