import { LinkButton } from "@/components/button/button";
import NoTeamImg from "@/public/images/no-team.png";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex h-[calc(100vh-60px)] flex-col items-center justify-center gap-[48px]">
      <Image src={NoTeamImg} alt="물건 옮기는 사람들" />
      <div className="flex flex-col items-center justify-center gap-[80px]">
        <div className="flex flex-col items-center justify-center gap-[4px] text-text-default">
          <p>아직 소속된 팀이 없습니다.</p>
          <p>팀을 생성하거나 팀에 참여해보세요.</p>
        </div>
        <div className="flex w-[186px] flex-col gap-[16px]">
          <LinkButton btnSize="large" btnStyle="solid" href="/addteam">
            팀 생성하기
          </LinkButton>
          <LinkButton
            btnSize="large"
            btnStyle="outlined"
            href="/participate-team"
          >
            팀 참여하기
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
