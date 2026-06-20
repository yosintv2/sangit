import { readdirSync } from "fs";
import { join } from "path";

const POSTAL_DIR = join(process.cwd(), "public", "data", "postal");

export async function generateStaticParams() {
  return readdirSync(POSTAL_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ district: f.replace(".json", "") }));
}

export default function DistrictLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
