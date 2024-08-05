import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";

import LoggedInHeader from "./logged-in-header";
import NoneLoginHeader from "./none-login-header";

export default function Header() {
  const isLoggedIn = hasCookie("accessToken", { cookies });

  return (
    <header className="fixed left-0 right-0 top-0 z-40 h-[60px] w-full bg-background-secondary px-4">
      <div className="xl:mx-auto xl:max-w-[1200px] flex h-full items-center justify-between">
        {isLoggedIn ? <LoggedInHeader /> : <NoneLoginHeader />}
      </div>
    </header>
  );
}
