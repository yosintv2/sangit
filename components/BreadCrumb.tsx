import Link from "next/link";

export type Crumb = { name: string; href?: string };

interface Props {
  crumbs: Crumb[];
}

export function BreadCrumb({ crumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-sm text-gray-500">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && (
              <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {isLast || !crumb.href ? (
              <span className={isLast ? "text-gray-900 font-medium" : ""}>{crumb.name}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-[#C0392B] transition-colors">
                {crumb.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
