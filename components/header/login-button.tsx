"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LoginButton() {
  const pathname = usePathname();
  return (
    pathname === "/" && (
      <Link href="/login" className="text-base font-semibold text-text-primary">
        로그인
      </Link>
    )
  );
}
