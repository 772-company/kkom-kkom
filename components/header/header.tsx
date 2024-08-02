import { getUser } from "@/app/action";
import Menu from "@/public/icons/gnb-menu.svg";
import Logo from "@/public/icons/logo.svg";
import UserIcon from "@/public/icons/user.svg";
import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import Link from "next/link";

import LoginButton from "./login-button";

export default async function Header() {
  const isLoggedIn = hasCookie("accessToken", { cookies });
  const userInfo = await getUser();

  return (
    <header className="fixed left-0 right-0 top-0 h-[60px] w-full bg-background-secondary px-4">
      <div className="flex h-full items-center justify-between xl:mx-auto xl:max-w-[1200px]">
        <div className="flex items-center gap-4">
          {isLoggedIn && (
            <div className="md:hidden">
              <Menu width={24} height={24} />
            </div>
          )}
          <Link href="/" className="flex items-center gap-1">
            <div className="size-4 xl:size-6">
              <Logo width={"100%"} height={"100%"} />
            </div>
            <h2 className="text-xl font-bold text-brand-primary">KKOM-KKOM</h2>
          </Link>
        </div>
        {isLoggedIn ? (
          // TODO - 로그인 상태 시 헤더
          <div className="flex items-center gap-2">
            <div className="size-6 xl:size-4">
              <UserIcon width={"100%"} height={"100%"} />
            </div>
            <p className="hidden text-sm font-medium text-text-primary xl:block">
              {userInfo.nickname}
            </p>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}
