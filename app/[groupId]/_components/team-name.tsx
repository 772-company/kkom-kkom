"use client";

import Popover from "@/components/popover/popover";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import getGroupInfo from "@/lib/apis/group";
import Gear from "@/public/icons/gear.svg";
import ThumbnailSVG from "@/public/images/thumbnail_team.svg";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

import ModalTeamDelete from "./modal/modal-team-delete";

interface TeamNameProps {
  groupId: string;
  isAdmin: boolean;
}

const TeamName = ({ groupId, isAdmin }: TeamNameProps) => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["groupInfo"],
    queryFn: () => getGroupInfo({ groupId: groupId }),
  });

  const teamName = data ? data?.name : "";

  const ModalTeamDeleteOverlay = useCustomOverlay(({ close }) => (
    <ModalTeamDelete close={close} teamName={teamName} groupId={groupId} />
  ));

  return (
    <div className="flex h-[64px] w-full items-center justify-end rounded-[12px] border-[1px] border-border-primary/10 bg-background-secondary px-[24px]">
      <p className="w-full text-[20px] font-[700] leading-[64px] text-text-primary">
        {teamName}
      </p>
      <div className="absolute flex items-center justify-center gap-[30px]">
        <ThumbnailSVG />
        {isAdmin && (
          <Popover
            triggerSvg={Gear}
            triggerHeight={24}
            triggerWidth={24}
            content={[
              {
                text: "수정하기",
                onClick: () => router.push(`/${groupId}/edit`),
              },
              { text: "삭제하기", onClick: ModalTeamDeleteOverlay.open },
            ]}
            contentClassName="z-10 border-[1px] absolute right-0 bg-background-secondary border-border-primary/10 w-[120px] h-[80px] text-text-primary"
          />
        )}
      </div>
    </div>
  );
};

export default TeamName;
