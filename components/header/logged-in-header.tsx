import { getUser } from "@/app/action";
import Logo from "@/public/icons/logo.svg";
import UserIcon from "@/public/icons/user.svg";
import Link from "next/link";

import SideMenu from "./side-menu";

export default async function LoggedInHeader() {
  const userInfo = await getUser();
  return (
    <>
      <div className="flex items-center gap-4">
        <SideMenu />
        <Link href="/" className="flex items-center gap-1">
          <div className="size-4 xl:size-6">
            <Logo width={"100%"} height={"100%"} />
          </div>
          <h2 className="text-xl font-bold text-brand-primary">KKOM-KKOM</h2>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <div className="size-6 xl:size-4">
          <UserIcon width={"100%"} height={"100%"} />
        </div>
        <p className="hidden text-sm font-medium text-text-primary xl:block">
          {userInfo.nickname}
        </p>
      </div>
    </>
  );
}
