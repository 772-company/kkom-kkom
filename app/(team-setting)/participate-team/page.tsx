import ParticipateTeamForm from "./_components/participate-team-form";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-[80px] pt-[140px] text-text-primary">
      <h1 className="text-[40px] font-[500]">팀 참여하기</h1>
      <ParticipateTeamForm />
    </div>
  );
}
