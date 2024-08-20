"use client";

import { Membership } from "@/lib/apis/type";
import Check from "@/public/icons/dropdown-check.svg";
import Plus from "@/public/icons/plus.svg";
import hamster from "@/public/images/hamster.jpg";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LinkButton } from "../button/button";
import { Dropdown } from "../dropdown/dropdown";

interface GroupDropdownProps {
  memberships: Membership[];
}

export default function GroupDropdown({ memberships }: GroupDropdownProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(4);
  const currentGroupId = parseInt(pathname.split("/")[1], 10);
  const initialGroup =
    memberships.find((membership) => membership.group.id === currentGroupId) ||
    memberships[0];
  const [selectedGroupId, setSelectedGroupId] = useState(initialGroup.group.id);

  const handleSelect = (id: number) => {
    router.push(`/${id}`);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleShowLess = () => {
    setVisibleCount(4);
  };

  useEffect(() => {
    if (currentGroupId) {
      const currentGroup = memberships.find(
        (membership) => membership.group.id === currentGroupId,
      );
      if (currentGroup) {
        setSelectedGroupId(currentGroup.group.id);
      }
    }
  }, [currentGroupId, memberships]);

  return (
    <div className="hidden md:block">
      <Dropdown
        selected={initialGroup.group.name}
        setSelected={(name) => {
          const selectedGroup = memberships.find(
            (membership) => membership.group.name === name,
          );
          if (selectedGroup) setSelectedGroupId(selectedGroup.group.id);
        }}
      >
        <Dropdown.Button className="gap-[11px] text-base font-medium text-text-primary">
          <Check width={16} height={16} />
        </Dropdown.Button>
        <Dropdown.Body className="mt-7 flex w-[218px] flex-col gap-2 rounded-xl bg-background-secondary p-4">
          {memberships.slice(0, visibleCount).map((membership) => (
            <Dropdown.Item
              key={membership.group.id}
              value={membership.group.name}
            >
              <div
                className={`flex w-full items-center justify-between rounded-lg px-2 py-[7px] hover:bg-slate-700 ${
                  membership.group.id === selectedGroupId && "bg-slate-700"
                }`}
                onClick={() => handleSelect(membership.group.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative size-8 overflow-hidden rounded-md">
                    <Image
                      src={membership.group.image || hamster}
                      alt={`${membership.group.name} 이미지`}
                      fill
                    />
                  </div>
                  <p className="text-base font-medium text-white">
                    {membership.group.name}
                  </p>
                </div>
              </div>
            </Dropdown.Item>
          ))}
          {/* TODO - 더보기 버튼 */}
          {memberships.length > visibleCount ? (
            <button
              onClick={handleShowMore}
              className="flex w-full justify-center rounded-lg py-[7px] text-white hover:underline"
            >
              더보기
            </button>
          ) : (
            visibleCount > 4 && (
              <button
                onClick={handleShowLess}
                className="flex w-full justify-center rounded-lg py-[7px] text-white hover:underline"
              >
                숨기기
              </button>
            )
          )}
          <Dropdown.CloseItem>
            <LinkButton
              btnSize="large"
              btnStyle="none_background"
              className="mt-2"
              href="/addteam"
            >
              <Plus width={16} height={16} className="mr-1" /> 팀 추가하기
            </LinkButton>
          </Dropdown.CloseItem>
        </Dropdown.Body>
      </Dropdown>
    </div>
  );
}
