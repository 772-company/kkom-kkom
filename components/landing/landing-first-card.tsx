import Folder from "@/public/icons/folder.svg";
import First from "@/public/images/landing-first.svg";

export default function LandingFirstCard() {
  return (
    <section className="mt-[48px] h-[467px] rounded-[40px] bg-gradient-to-r from-brand-primary to-brand-tertiary p-[1px] shadow-[0px_0px_12px_2px_#FFFFFF40] md:mt-[119px] md:h-[354px] xl:mt-[180px] xl:h-[419px]">
      <div className="flex h-full justify-center rounded-[40px] bg-background-primary">
        <div className="flex flex-col justify-end gap-[40px] md:flex-row-reverse md:items-end md:gap-[100px]">
          <div className="flex flex-col gap-4 md:h-full md:justify-center">
            <div className="flex size-[48px] items-center justify-center rounded-xl border border-border-primary border-opacity-10 bg-background-secondary">
              <Folder width={24} height={24} />
            </div>
            <h3 className="text-lg font-medium leading-[21px] text-white xl:text-2xl">
              그룹으로
              <br /> 할 일을 관리해요
            </h3>
          </div>
          <First />
        </div>
      </div>
    </section>
  );
}
