import Pin from "@/public/icons/pin.png";
import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "../theme/theme-toggle";
import LoginButton from "./login-button";

export default function NoneLoginHeader() {
  return (
    <>
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-1">
          <div className="size-6 xl:size-8">
            <Image src={Pin} alt="로고" />
          </div>
          <h2 className="text-xl font-bold text-brand-primary">KKOM-KKOM</h2>
        </Link>
      </div>
      <div className="flex gap-4">
        <ThemeToggle />
        <LoginButton />
      </div>
    </>
  );
}
