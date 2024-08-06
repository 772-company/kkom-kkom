import ResetPasswordForm from "./_components/reset-password-form";

export default function Page({
  searchParams,
}: {
  searchParams: {
    [key: string]: string;
  };
}) {
  const { token } = searchParams;
  return (
    <>
      <h1 className="mx-auto mb-6 text-center text-2xl font-medium text-text-primary md:mb-[80px] xl:text-[40px]">
        비밀번호 재설정
      </h1>
      <ResetPasswordForm token={token} />
    </>
  );
}
