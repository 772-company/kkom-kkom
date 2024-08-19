import AddTeamForm from "./_component/add-team-form";

export default function Page() {
  return (
    <div className="mt-[140px] flex flex-col justify-center gap-[80px]">
      <h1 className="text-center text-[40px] font-[500] text-text-primary">
        팀 생성하기
      </h1>
      <AddTeamForm />
    </div>
  );
}
