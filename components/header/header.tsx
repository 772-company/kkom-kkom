import Logo from "@/public/icons/logo.svg";
import Link from "next/link";

import LoginButton from "./login-button";

export default function Header() {
  // TODO - cookie 토근 여부 확인하는 로직
  const isLoggedIn = false;

  return (
    <header className="fixed left-0 right-0 top-0 h-[60px] w-full bg-background-secondary px-4">
      <div className="flex h-full items-center justify-between lg:mx-auto lg:max-w-[1200px]">
        <Link href="/" className="flex items-center gap-1">
          <div className="size-4 lg:size-6">
            <Logo width={"100%"} height={"100%"} />
          </div>
          <h2 className="text-xl font-bold text-brand-primary">KKOM-KKOM</h2>
        </Link>
        {isLoggedIn ? (
          // TODO - 로그인 상태 시 헤더
          <p>로그인 상태</p>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}
