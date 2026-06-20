import type { Metadata } from "next";
import { Suspense } from "react";
import { PostalLookupClient } from "./PostalLookupClient";

export const metadata: Metadata = {
  title: "Singapore Postal Code Lookup | SgPostalCode.com",
  description: "Look up any Singapore postal code instantly. Find building name, full address, GPS coordinates, Google Maps location, and nearby postal codes for any 6-digit Singapore postal code.",
  keywords: ["singapore postal code lookup", "sg postal code finder", "singapore address lookup", "6 digit postal code singapore", "find postal code singapore", "singapore postcode search"],
  alternates: { canonical: "https://www.sgpostalcode.com/postal/" },
  openGraph: {
    title: "Singapore Postal Code Lookup — SgPostalCode.com",
    description: "Instant lookup for any of 121,360 Singapore postal codes. Building name, address, map, and nearby codes.",
    type: "website",
    url: "https://www.sgpostalcode.com/postal/",
  },
};

export default function PostalPage() {
  return (
    <Suspense>
      <PostalLookupClient />
    </Suspense>
  );
}
