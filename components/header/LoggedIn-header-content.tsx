"use client";

import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { getUser } from "@/lib/apis/user";
import Menu from "@/public/icons/gnb-menu.svg";
import Logo from "@/public/icons/logo.svg";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import LinkWithProgress from "../link-with-progress";
import GroupDropdown from "./group-dropdown";
import ModalSideMenu from "./modal-side-menu";
import PopoverTrigger from "./popover-trigger";

export default function LoggedInHeaderContent() {
  const { data, isSuccess } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  const modalSideMenuOverlay = useCustomOverlay(({ close }) => (
    <ModalSideMenu close={close} memberships={memberships} />
  ));

  if (!isSuccess || !data) {
    return null;
  }
  const { memberships, nickname } = data;

  return (
    <>
      <div className="flex items-center gap-4">
        {/* NOTE - 클릭 시 사이드 메뉴  */}
        <div className="md:hidden" onClick={modalSideMenuOverlay.open}>
          <Menu width={24} height={24} />
        </div>
        <LinkWithProgress href="/" className="flex items-center gap-1">
          <div className="size-4 xl:size-6">
            <Logo width={"100%"} height={"100%"} />
          </div>
          <h2 className="text-xl font-bold text-brand-primary">KKOM-KKOM</h2>
        </LinkWithProgress>
        {memberships.length !== 0 ? (
          <GroupDropdown memberships={memberships} />
        ) : (
          <LinkWithProgress
            href="/addteam"
            className="hidden text-base font-medium text-text-primary md:block"
          >
            팀 생성하기
          </LinkWithProgress>
        )}
        <LinkWithProgress
          href="/boards"
          className="hidden text-base font-medium text-text-primary md:block"
        >
          자유게시판
        </LinkWithProgress>
      </div>
      <PopoverTrigger nickname={nickname} />
    </>
  );
}
