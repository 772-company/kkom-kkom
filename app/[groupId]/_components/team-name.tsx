"use client";

import Popover from "@/components/popover/popover";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import Gear from "@/public/icons/gear.svg";
import Thumbnail from "@/public/images/thumbnail-team.png";
import Image from "next/image";

import ModalTeamDelete from "./modal/modal-team-delete";
import ModalTeamNameEdit from "./modal/modal-team-name-edit";

interface TeamNameProps {
  isAdmin: boolean;
  teamName: string;
  groupId: string;
}

const TeamName = ({ isAdmin, teamName, groupId }: TeamNameProps) => {
  const ModalTeamNameEditOverlay = useCustomOverlay(({ close }) => (
    <ModalTeamNameEdit
      close={close}
      groupId={groupId}
      currentTeamName={teamName}
    />
  ));

  const ModalTeamDeleteOverlay = useCustomOverlay(({ close }) => (
    <ModalTeamDelete close={close} teamName={teamName} groupId={groupId} />
  ));

  return (
    <div className="flex h-[64px] w-full items-center justify-end rounded-[12px] border-[1px] border-border-primary/10 bg-border-primary/10 px-[24px]">
      <p className="w-full text-[20px] font-[700] leading-[64px] text-white">
        {teamName}팀
      </p>
      <div className="absolute flex items-center justify-center gap-[30px]">
        <Image src={Thumbnail} alt="썸네일" height={64} />
        {isAdmin && (
          <Popover
            triggerSvg={Gear}
            triggerHeight={24}
            triggerWidth={24}
            content={[
              { text: "수정하기", onClick: ModalTeamNameEditOverlay.open },
              { text: "삭제하기", onClick: ModalTeamDeleteOverlay.open },
            ]}
            contentClassName="z-10 border-[1px] absolute right-0 bg-background-secondary border-border-primary/10 w-[120px] h-[80px] text-white"
          />
        )}
      </div>
    </div>
  );
};

export default TeamName;
