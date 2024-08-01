const Member = ({}) => {
  return (
    <>
      <p className="text-text-primary">멤버염</p>
    </>
  );
};

const MemberList = ({ members }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-[8px]">
          <p className="text-[16px] font-[500] text-text-primary">멤버</p>
          <p className="text-[16px] font-[400] text-text-default">(?명)</p>
        </div>
        <p className="text-[14px] font-[400] text-brand-primary">
          + 새로운 멤버 초대하기
        </p>
      </div>
      <div className="멤버 목록 자리">
        {members.length > 0 ? (
          members.map((member) => <Member key={members.userId} />)
        ) : (
          <p className="text-text-primary">아직 멤버가 없습니다</p>
        )}
      </div>
    </>
  );
};

export default MemberList;
