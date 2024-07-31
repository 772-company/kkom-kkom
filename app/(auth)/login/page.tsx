import Link from "next/link";

import EasyLogin from "../_components/easy-login";
import LoginFrom from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="w-full px-4 pt-6 md:pt-[100px] xl:pt-[140px]">
      <div className="mx-auto min-w-[343px] max-w-[460px]">
        <h2 className="mx-auto mb-6 text-center text-2xl font-medium text-text-primary md:mb-[80px] xl:text-[40px]">
          로그인
        </h2>
        <LoginFrom />
        <div className="mt-6">
          <section className="mb-[25px] flex items-center justify-center gap-3">
            <p className="text-sm font-medium text-text-primary">
              아직 계정이 없으신가요 ?
            </p>
            <Link
              href="/signin"
              className="text-sm font-medium text-brand-primary underline"
            >
              가입하기
            </Link>
          </section>
          <EasyLogin variant="로그인" />
        </div>
      </div>
    </div>
  );
}
