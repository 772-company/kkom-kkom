import Logo from "@/public/icons/logo.svg";
import Link from "next/link";

export default function Header() {
  // TODO - cookie 토근 여부 확인하는 로직
  const loggedIn = false;

  return (
    <header className="h-[60px] w-full bg-background-secondary px-4">
      <div className="flex h-full items-center justify-between xl:mx-auto xl:max-w-[1200px]">
        {loggedIn ? (
          // TODO - 로그인 상태 시 헤더
          <p>로그인 상태</p>
        ) : (
          <>
            <Link href="/" className="flex items-center gap-1">
              <div className="size-4 xl:size-6">
                <Logo width={"100%"} height={"100%"} />
              </div>
              <h2 className="text-xl font-bold text-brand-primary">
                KKOM-KKOM
              </h2>
            </Link>
            <Link
              href="/login"
              className="text-base font-semibold text-text-primary"
            >
              로그인
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
