import Link from "next/link";

import EasyAuth from "../_components/easy-auth";
import SignUpForm from "./_components/signup-form";

export default function SignUpPage() {
  return (
    <>
      <h1 className="mx-auto mb-6 text-center text-2xl font-medium text-text-primary md:mb-[80px] xl:text-[40px]">
        회원가입
      </h1>
      <SignUpForm />
      <div className="mt-6">
        <section className="mb-[25px] flex items-center justify-center gap-3">
          <p className="text-sm font-medium text-text-primary">
            이미 회원이신가요 ?
          </p>
          <Link
            href="/login"
            className="text-sm font-medium text-brand-primary underline"
          >
            로그인하기
          </Link>
        </section>
        <EasyAuth variant="회원가입" />
      </div>
    </>
  );
}
