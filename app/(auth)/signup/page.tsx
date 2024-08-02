import EasyAuth from "../_components/easy-auth";
import SignUpForm from "./_components/signup-form";

export default function SignUpPage() {
  return (
    <>
      <h1 className="mx-auto mb-6 text-center text-2xl font-medium text-text-primary md:mb-[80px] xl:text-[40px]">
        회원가입
      </h1>
      <SignUpForm />
      <EasyAuth variant="회원가입" />
    </>
  );
}
