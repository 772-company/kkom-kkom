"use client";

import Popover from "@/components/popover/popover";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { getGroupInfo } from "@/lib/apis/group/index";
import { GetGroupsIdResponse } from "@/lib/apis/type";
import { getUser } from "@/lib/apis/user";
import Crown from "@/public/icons/crown.png";
import DefaultProfile from "@/public/icons/default-profile.svg";
import Kebab from "@/public/icons/kebab-small.svg";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import ModalMemberDelete from "./modal/modal-member-delete";
import ModalMemberInvitation from "./modal/modal-member-invitation";
import ModalMemberProfile from "./modal/modal-member-profile";

type MemberType = GetGroupsIdResponse["members"][0];

interface MemberCardProps {
  member: MemberType;
  groupId: string;
  isAdmin: boolean;
  teamName: string;
}

interface MemberListProps {
  groupId: string;
  isAdmin: boolean;
}

function MemberCard({ member, groupId, isAdmin, teamName }: MemberCardProps) {
  const ModalMemberProfileOverlay = useCustomOverlay(({ close }) => (
    <ModalMemberProfile
      close={close}
      userImage={member.userImage}
      userName={member.userName}
      userEmail={member.userEmail}
    />
  ));

  const ModalMemberDeleteOverlay = useCustomOverlay(({ close }) => (
    <ModalMemberDelete
      close={close}
      groupId={groupId}
      memberUserId={member.userId}
      userName={member.userName}
      teamName={teamName}
    />
  ));

  const { data } = useQuery({ queryKey: ["getUser"], queryFn: getUser });
  const myId = data ? data.id : "";

  return (
    <div
      role="presentation"
      onClick={ModalMemberProfileOverlay.open}
      className="flex h-[73px] min-w-[163.5px] cursor-pointer items-center justify-between rounded-[16px] bg-background-secondary px-[24px] py-[20px] hover:bg-background-tertiary hover:shadow-lg active:scale-[0.98] md:min-w-[216px] xl:min-w-[382px]"
    >
      <div className="grid grid-cols-[24px_1fr] grid-rows-2 items-center justify-center gap-x-[8px] md:grid-cols-[32px_1fr] md:gap-x-[12px] md:gap-y-[2px]">
        {member.userImage ? (
          <Image
            src={member.userImage}
            alt="유저 프로필 사진"
            width={24}
            height={24}
            className="col-span-1 row-span-1 h-[24px] w-[24px] rounded-full md:row-span-2 md:h-[32px] md:w-[32px]"
          />
        ) : (
          <DefaultProfile className="col-span-1 row-span-1 h-[24px] w-[24px] rounded-full md:row-span-2 md:h-[32px] md:w-[32px]" />
        )}
        <div className="flex items-center gap-[4px]">
          {member.role === "ADMIN" && (
            <Image src={Crown} alt="왕관" width={20} height={20} />
          )}
          <p className="col-span-1 col-start-2 row-span-1 text-[14px] font-[500] text-text-primary">
            {member.userName}
          </p>
        </div>

        <p className="col-span-2 row-span-1 row-start-2 truncate text-[12px] font-[400] text-text-secondary md:col-span-1 md:col-start-2">
          {member.userEmail}
        </p>
      </div>
      {(isAdmin || myId === member.userId) && (
        <button
          aria-label="팝오버"
          type="submit"
          onClick={(event) => {
            event.stopPropagation(); // 클릭 이벤트 전파 중지
          }}
        >
          <Popover
            triggerSvg={Kebab}
            triggerHeight={16}
            triggerWidth={16}
            content={[
              {
                text: myId === member.userId ? "탈퇴하기" : "삭제하기",
                onClick: ModalMemberDeleteOverlay.open,
              },
            ]}
            contentClassName="z-10 border-[1px] absolute right-0 bg-background-secondary border-border-primary/10 w-[120px] h-[40px] text-text-secondary"
          />
        </button>
      )}
    </div>
  );
}

function MemberList({ groupId, isAdmin }: MemberListProps) {
  const { data } = useQuery({
    queryKey: ["groupInfo"],
    queryFn: () => getGroupInfo({ groupId }),
  });

  const teamName = data ? data.name : "";
  const members = data ? data.members : [];

  const ModalMemberAddOverlay = useCustomOverlay(({ close }) => (
    <ModalMemberInvitation close={close} groupId={groupId} />
  ));

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-[8px]">
          <p className="text-[16px] font-[500] text-text-primary">멤버</p>
          <p className="text-[16px] font-[400] text-text-default">
            ({members.length}명)
          </p>
        </div>
        {isAdmin && (
          <button
            type="submit"
            onClick={ModalMemberAddOverlay.open}
            className="text-[14px] font-[400] text-brand-primary hover:scale-[1.02] active:scale-[0.98]"
          >
            + 새로운 멤버 초대하기
          </button>
        )}
      </div>
      <div className="grid h-[170px] grid-cols-2 gap-[16px] overflow-hidden overflow-y-scroll md:grid-cols-3 md:gap-[24px]">
        {members.length > 0 ? (
          members.map((member) => (
            <MemberCard
              key={member.userId}
              isAdmin={isAdmin}
              member={member}
              groupId={groupId}
              teamName={teamName}
            />
          ))
        ) : (
          <p className="text-text-primary">아직 멤버가 없습니다</p>
        )}
      </div>
    </div>
  );
}

export default MemberList;
