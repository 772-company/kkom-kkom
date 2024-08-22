import EditTeamForm from "./_components/edit-team-form";

export default function Page({ params }: { params: { groupId: string } }) {
  return (
    <div className="mt-[140px] flex flex-col justify-center gap-[80px]">
      <h1 className="text-center text-[40px] font-[500] text-text-primary">
        팀 수정하기
      </h1>
      <EditTeamForm groupId={params.groupId} />
    </div>
  );
}
