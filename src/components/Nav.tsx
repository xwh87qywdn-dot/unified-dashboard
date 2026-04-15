"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="topnav">
      <Link href="/" className="brand">
        ⬡ Unified Dashboard
      </Link>
      <Link href="/" className={pathname === "/" ? "active" : ""}>
        Dashboard
      </Link>
      <Link
        href="/ai"
        className={pathname.startsWith("/ai") ? "active" : ""}
      >
        AI Workspace
      </Link>
    </nav>
  );
}
