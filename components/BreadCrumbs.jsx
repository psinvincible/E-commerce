"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumbs(){
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);

    const crumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const label = decodeURIComponent(segment).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

        return { href, label};
    })

    return (
        <nav className="text-sm text-gray-500 mb-4">
            <ol className="flex flex-wrap items-center gap-1">
                <li>
                    <Link href={"/"} className="hover:text-black">Home</Link>
                </li>
                {crumbs.map((crumb, index) => (
                    <li key={crumb.href} className="flex items-center gap-1">
                        <span>/</span>
                        {index === crumbs.length -1 ? (
                            <span className="text-gray-800 font-medium">{crumb.label}</span>
                        ) : (
                            <Link href={crumb.href} className="hover:text-black">{crumb.label}</Link>
                        )}
                    </li>
                ))}
            </ol>

        </nav>
    )
}