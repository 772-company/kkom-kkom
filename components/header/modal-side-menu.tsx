"use client";

import useClickOutside from "@/hooks/use-click-outside";
import { Membership } from "@/lib/apis/type";
import CloseButton from "@/public/icons/x.svg";
import hamster from "@/public/images/hamster.jpg";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LegacyRef } from "react";

interface ModalSideMenuProps {
  close: () => void;
  memberships: Membership[];
}
export default function ModalSideMenu({
  close,
  memberships,
}: ModalSideMenuProps) {
  const router = useRouter();
  const modalRef = useClickOutside(() => {
    close();
  });

  const handleRoute = (id: number) => {
    router.push(`/${id}`);
    close();
  };

  return (
    <section className="fixed inset-0 z-40 flex bg-black bg-opacity-50">
      <motion.div
        ref={modalRef as LegacyRef<HTMLDivElement> | undefined}
        className="relative h-full w-1/2 bg-background-secondary"
      >
        <button onClick={close} className="absolute right-4 top-4">
          <CloseButton width={24} height={24} />
        </button>
        <ul className="mt-[75px] flex cursor-pointer flex-col gap-[20px] px-4 text-sm font-medium text-text-primary">
          {memberships.map((membership) => (
            <li
              key={membership.group.id}
              className="flex h-[35px] items-center gap-3 rounded-lg px-[3px] transition-all duration-100 hover:bg-slate-700"
              onClick={() => handleRoute(membership.group.id)}
            >
              <div className="relative size-6 overflow-hidden rounded-md">
                {/* TODO - 기본 이미지 바꾸기 */}
                <Image
                  src={membership.group.image || hamster}
                  alt={`${membership.group.name} 이미지`}
                  fill
                />
              </div>
              <p> {membership.group.name} 팀</p>
            </li>
          ))}
          <li
            className="flex h-[35px] items-center gap-3 rounded-lg px-[3px] transition-all duration-100 hover:bg-slate-700"
            onClick={close}
          >
            🌈
            <Link href="/addteam">팀 추가하기</Link>
          </li>
          <li
            className="flex h-[35px] items-center gap-3 rounded-lg px-[3px] transition-all duration-100 hover:bg-slate-700"
            onClick={close}
          >
            📋
            <Link href="/boards">자유게시판</Link>
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
