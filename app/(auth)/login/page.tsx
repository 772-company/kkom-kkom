import Google from "@/public/icons/google.svg";
import KakaoTalk from "@/public/icons/kakao-talk.svg";
import Link from "next/link";

import LoginFrom from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="w-full px-4 pt-6 md:pt-[100px] xl:pt-[140px]">
      <div className="mx-auto min-w-[343px] max-w-[460px]">
        <h2 className="mx-auto mb-6 text-center text-2xl font-medium text-text-primary md:mb-[80px] xl:text-[40px]">
          로그인
        </h2>
        <LoginFrom />
        {/* TODO - 간편 로그인 */}
        <section className="mt-6">
          <div className="mb-[25px] flex items-center justify-center gap-3">
            <p className="text-sm font-medium text-text-primary">
              아직 계정이 없으신가요 ?
            </p>
            <Link
              href="/signin"
              className="text-sm font-medium text-brand-primary underline"
            >
              가입하기
            </Link>
          </div>
          <div>
            <p className="flex basis-[100%] items-center text-base font-medium text-white before:mr-6 before:h-[1px] before:grow before:bg-border-primary before:bg-opacity-10 before:text-[0px] before:content-[''] after:ml-6 after:h-[1px] after:grow after:bg-border-primary after:bg-opacity-10 after:text-[0px] after:content-['']">
              OR
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-base font-medium text-white">간편 로그인하기</p>
            <div className="flex gap-4">
              <button className="flex size-[42px] items-center justify-center rounded-full bg-[#F5E14B]">
                <KakaoTalk width={26} height={24} />
              </button>
              <button className="flex size-[42px] items-center justify-center rounded-full bg-[#F9FAFB]">
                <Google width={26} height={24} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
