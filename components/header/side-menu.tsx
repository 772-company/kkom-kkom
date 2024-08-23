"use client";

import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { Membership } from "@/lib/apis/type";
import Menu from "@/public/icons/gnb-menu.svg";

import ModalSideMenu from "./modal-side-menu";

interface SideMenuProps {
  memberships: Membership[];
}

export default function SideMenu({ memberships }: SideMenuProps) {
  const modalSideMenuOverlay = useCustomOverlay(({ close }) => (
    <ModalSideMenu close={close} memberships={memberships} />
  ));
  // TODO - 사이드 메뉴 열기
  return (
    <div
      className="md:hidden"
      onClick={modalSideMenuOverlay.open}
      role="presentation"
    >
      <Menu width={24} height={24} />
    </div>
  );
}
