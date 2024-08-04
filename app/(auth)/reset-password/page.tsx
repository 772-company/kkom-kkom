import ResetPasswordForm from "./_components/reset-password-form";

export default function Page() {
  return (
    <>
      <h1 className="xl:text-[40px] mx-auto mb-6 text-center text-2xl font-medium text-text-primary md:mb-[80px]">
        비밀번호 재설정
      </h1>
      <ResetPasswordForm />
    </>
  );
}
