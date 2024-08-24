"use client";

import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { getUser } from "@/lib/apis/user";
import Menu from "@/public/icons/gnb-menu.svg";
import Pin from "@/public/icons/pin.png";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import ThemeToggle from "../theme/theme-toggle";
import GroupDropdown from "./group-dropdown";
import ModalSideMenu from "./modal-side-menu";
import PopoverTrigger from "./popover-trigger";

export default function LoggedInHeaderContent() {
  const { data, isSuccess } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  const modalSideMenuOverlay = useCustomOverlay(({ close }) => (
    /* eslint-disable-next-line */
    <ModalSideMenu close={close} memberships={memberships} />
  ));

  if (!isSuccess) {
    return null;
  }
  const { memberships, nickname, image } = data;

  return (
    <>
      <div className="flex items-center gap-4">
        {/* NOTE - 클릭 시 사이드 메뉴  */}
        <div
          className="cursor-pointer md:hidden"
          onClick={modalSideMenuOverlay.open}
          role="presentation"
        >
          <Menu width={24} height={24} />
        </div>
        <Link href="/" className="flex items-center gap-1">
          <div className="size-6 xl:size-8">
            <Image src={Pin} alt="로고" />
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
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <PopoverTrigger nickname={nickname} image={image} />
      </div>
    </>
  );
}
