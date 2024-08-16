import { LinkButton } from "@/components/button/button";
import header from "@/public/images/landing-header-large.png";
import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import Image from "next/image";

export default function Home() {
  const isLoggedIn = hasCookie("refreshToken", { cookies });
  return (
    <>
      <section className="absolute h-[547px] w-full">
        <Image src={header} fill alt="꼼꼼 랜딩" className="object-cover" />
        <div className="mt-[55px] flex flex-col items-center justify-center gap-1 md:mt-[100px] xl:mt-[84px]">
          <h2 className="text-2xl font-semibold text-text-primary md:text-[40px]">
            함께 만들어가는 투두 리스트 🛠️
          </h2>
          <h1 className="z-10 bg-gradient-to-r from-brand-primary to-brand-tertiary bg-clip-text text-[32px] font-semibold text-brand-primary text-transparent md:text-[48px] xl:text-[64px]">
            kkom-kkom
          </h1>
          <LinkButton
            btnSize="large"
            btnStyle="gradient"
            href={isLoggedIn ? "" : "/login"}
            className="mt-[300px] w-[343px] xl:mt-[360px]"
          >
            지금 시작하기
          </LinkButton>
        </div>
      </section>
      <section></section>
      <section></section>
    </>
  );
}
