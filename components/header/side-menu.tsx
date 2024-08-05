"use client";

import Menu from "@/public/icons/gnb-menu.svg";

export default function SideMenu() {
  // TODO - 사이드 메뉴 열기
  return (
    <div className="md:hidden" onClick={() => alert("사이드 메뉴 open")}>
      <Menu width={24} height={24} />
    </div>
  );
}
