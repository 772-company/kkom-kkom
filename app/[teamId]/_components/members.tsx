import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";
import DefaultProfile from "@/public/icons/default-profile.svg";
import Kebab from "@/public/icons/kebab-small.svg";

type MemberType = GetTeamIdGroupsIdResponse["members"][0];

interface MemberProps {
  member: MemberType;
}

interface MembersProps {
  members: MemberType[];
}

const Member = ({ member }: MemberProps) => {
  const MEMBER_PROFILE_IMAGE = member.userImage
    ? member.userImage
    : DefaultProfile;

  return (
    <div className="flex h-[73px] max-w-[163.5px] items-center justify-between rounded-[16px] bg-background-secondary px-[24px] py-[20px] md:max-w-[216px] xl:max-w-[384px]">
      <div className="flex items-center gap-[12px]">
        <MEMBER_PROFILE_IMAGE className="h-[32px] w-[32px] rounded-full" />
        <div className="flex flex-col gap-[2px]">
          <p className="text-[14px] font-[500] text-text-primary">
            {member.userName}
          </p>
          <p className="text-[12px] font-[400] text-text-secondary">
            {member.userEmail}
          </p>
        </div>
      </div>
      <Kebab width={16} height={16} />
    </div>
  );
};

//TODO - admin인지 member인지 확인한 뒤에 <+ 새로운 멤버 초대하기> 렌더링하기
const Members = ({ members }: MembersProps) => {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-[8px]">
          <p className="text-[16px] font-[500] text-text-primary">멤버</p>
          <p className="text-[16px] font-[400] text-text-default">
            ({members.length}명)
          </p>
        </div>
        <p className="text-[14px] font-[400] text-brand-primary">
          + 새로운 멤버 초대하기
        </p>
      </div>
      <div className="grid h-[170px] grid-cols-3 gap-[24px] overflow-y-scroll">
        {members.length > 0 ? (
          members.map((member) => (
            <Member key={member.userId} member={member} />
          ))
        ) : (
          <p className="text-text-primary">아직 멤버가 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default Members;
