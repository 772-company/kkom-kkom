import footer from "@/public/images/landing-footer-large.png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative mt-[123px] h-[517px] w-full xl:mx-auto xl:max-w-[1920px]">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-semibold text-text-primary md:text-[40px]">
          지금 바로 시작해보세요
        </h2>
        <h3 className="text-center text-base font-medium leading-[19px] text-text-primary md:text-2xl">
          팀원 모두가 같은 방향, <br className="md:hidden" />
          같은 속도로 나아가는 가장 쉬운 방법
        </h3>
      </div>
      <Image
        src={footer}
        fill
        alt="할 일 옮기는 캐릭터"
        className="object-cover"
      />
    </footer>
  );
}
