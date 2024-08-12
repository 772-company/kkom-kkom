import { getUser } from "@/lib/apis/user";
import Logo from "@/public/icons/logo.svg";
import Link from "next/link";

import GroupDropdown from "./group-dropdown";
import PopoverTrigger from "./popover-trigger";
import SideMenu from "./side-menu";

export default async function LoggedInHeader() {
  const { nickname, memberships } = await getUser();
  return (
    <>
      <div className="flex items-center gap-4">
        {/* TODO - 클릭 시 사이드 메뉴 memberships 목록 + 자유게시판 */}
        <SideMenu memberships={memberships} />
        <Link href="/" className="flex items-center gap-1">
          <div className="size-4 xl:size-6">
            <Logo width={"100%"} height={"100%"} />
          </div>
          <h2 className="text-xl font-bold text-brand-primary">KKOM-KKOM</h2>
        </Link>
        {memberships.length !== 0 ? (
          <GroupDropdown memberships={memberships} />
        ) : (
          <Link
            href="/addteam"
            className="hidden text-base font-medium text-text-primary md:block"
          >
            팀 생성하기
          </Link>
        )}
        <Link
          href="/boards"
          className="hidden text-base font-medium text-text-primary md:block"
        >
          자유게시판
        </Link>
      </div>
      <PopoverTrigger nickname={nickname} />
    </>
  );
}
