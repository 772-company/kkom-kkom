"use client";

import { Membership } from "@/lib/apis/type";
import Check from "@/public/icons/dropdown-check.svg";
import Kebab from "@/public/icons/kebab-small.svg";
import Plus from "@/public/icons/plus.svg";
import hamster from "@/public/images/hamster.jpg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LinkButton } from "../button/button";
import { Dropdown } from "../dropdown/dropdown";

interface GroupDropdownProps {
  memberships: Membership[];
}

export default function GroupDropdown({ memberships }: GroupDropdownProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedGroupId, setSelectedGroupId] = useState(
    memberships[0].group.id,
  );

  const handleSelect = (id: number) => {
    setSelectedGroupId(id);
    router.push(`/${id}`);
  };

  return (
    <div className="hidden md:block">
      <Dropdown defaultSelected={`${memberships[0].group.name} 팀`}>
        <Dropdown.Button className="gap-[11px] text-base font-medium text-text-primary">
          <Check width={16} height={16} />
        </Dropdown.Button>
        <Dropdown.Body className="mt-7 flex w-[218px] flex-col gap-2 rounded-xl bg-background-secondary p-4">
          {memberships.map((membership) => (
            <Dropdown.Item
              key={membership.group.id}
              display={`${membership.group.name} 팀`}
            >
              <div
                className={`flex w-full items-center justify-between rounded-lg px-2 py-[7px] hover:bg-slate-700 ${membership.group.id === selectedGroupId && "bg-slate-700"}`}
                onClick={() => handleSelect(membership.group.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative size-8 overflow-hidden rounded-md">
                    {/* TODO - 이미지 없는 경우 기본 이미지 */}
                    <Image
                      src={membership.group.image || hamster}
                      alt={`${membership.group.name} 이미지`}
                      fill
                    />
                  </div>
                  <p className="text-base font-medium text-white">
                    {membership.group.name} 팀
                  </p>
                </div>
                <Kebab width={16} height={16} />
              </div>
            </Dropdown.Item>
          ))}
          <LinkButton
            btnSize="large"
            btnStyle="none_background"
            className="mt-2"
            href="/addteam"
          >
            <Plus width={16} height={16} className="mr-1" /> 팀 추가하기
          </LinkButton>
        </Dropdown.Body>
      </Dropdown>
    </div>
  );
}
