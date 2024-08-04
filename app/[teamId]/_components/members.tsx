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
    <div className="flex h-[73px] max-w-[163.5px] items-center justify-between rounded-[16px] bg-background-secondary px-[24px] py-[20px] md:max-w-[216px] lg:max-w-[384px]">
      <div className="grid grid-cols-[24px_1fr] grid-rows-2 items-center justify-center gap-x-[8px] md:grid-cols-[32px_1fr] md:gap-x-[12px] md:gap-y-[2px]">
        <MEMBER_PROFILE_IMAGE className="col-span-1 row-span-1 h-[24px] w-[24px] rounded-full md:row-span-2 md:h-[32px] md:w-[32px]" />
        <p className="col-span-1 col-start-2 row-span-1 text-[14px] font-[500] text-text-primary">
          {member.userName}
        </p>
        <p className="col-span-2 row-span-1 row-start-2 truncate text-[12px] font-[400] text-text-secondary md:col-span-1 md:col-start-2">
          {member.userEmail}
        </p>
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
      <div className="grid h-[170px] grid-cols-2 gap-[16px] overflow-y-scroll scrollbar-custom md:grid-cols-3 md:gap-[24px]">
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
