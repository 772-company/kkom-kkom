import Logo from "@/public/icons/logo.svg";
import Link from "next/link";

import LoginButton from "./login-button";

export default function NoneLoginHeader() {
  return (
    <>
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-1">
          <div className="size-4 xl:size-6">
            <Logo width={"100%"} height={"100%"} />
          </div>
          <h2 className="text-xl font-bold text-brand-primary">KKOM-KKOM</h2>
        </Link>
      </div>
      <LoginButton />
    </>
  );
}
