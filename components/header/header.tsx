import Logo from "@/public/icons/logo.svg";
import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import Link from "next/link";

import LoginButton from "./login-button";
import SideMenu from "./side-menu";
import UserInfo from "./user-info";

export default function Header() {
  const isLoggedIn = hasCookie("accessToken", { cookies });

  return (
    <header className="fixed left-0 right-0 top-0 h-[60px] w-full bg-background-secondary px-4">
      <div className="flex h-full items-center justify-between xl:mx-auto xl:max-w-[1200px]">
        <div className="flex items-center gap-4">
          {isLoggedIn && <SideMenu />}
          <Link href="/" className="flex items-center gap-1">
            <div className="size-4 xl:size-6">
              <Logo width={"100%"} height={"100%"} />
            </div>
            <h2 className="text-xl font-bold text-brand-primary">KKOM-KKOM</h2>
          </Link>
        </div>
        {isLoggedIn ? <UserInfo /> : <LoginButton />}
      </div>
    </header>
  );
}
