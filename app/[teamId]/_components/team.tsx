import Popover from "@/components/popover/popover";
import Gear from "@/public/icons/gear.svg";
import Thumbnail from "@/public/images/thumbnail-team.png";
import Image from "next/image";

interface teamProps {
  teamName: string;
}

const Team = ({ teamName }: teamProps) => {
  const content = ["수정하기", "삭제하기"];
  return (
    <div className="border-flex h-[64px] w-full items-center rounded-[12px] border-[1px] border-border-primary/10 bg-border-primary/10 pl-[24px]">
      <p className="text-[20px] font-[700] leading-[64px] text-white">
        {teamName}
      </p>
      <Image
        src={Thumbnail}
        alt="썸네일"
        className="absolute right-[80px] top-[60px]"
      />
      <Popover
        triggerSvg={Gear}
        triggerHeight={64}
        triggerWidth={24}
        content={content}
        className="absolute right-[24px] top-[60px]"
        contentClassName="z-10 border-[1px] absolute right-0 top-[-15px] bg-background-secondary border-border-primary/10 w-[120px] h-[80px] text-white"
      />
    </div>
  );
};

export default Team;
