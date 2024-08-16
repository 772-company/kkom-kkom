import Done from "@/public/icons/landing-done.svg";
import Message from "@/public/icons/message.svg";
import Second from "@/public/images/landing-second.svg";
import Third from "@/public/images/landing-third.svg";

interface LandingCardProps {
  variant: "second" | "third";
}

const headings = {
  second: ["간단하게 멤버들을", "초대해요"],
  third: ["할 일도 간편하게", "체크해요"],
};

export default function LandingCard({ variant }: LandingCardProps) {
  const isSecond = variant === "second";

  return (
    <section
      className={`${isSecond ? "border border-border-primary border-opacity-10 bg-background-secondary" : "bg-slate-950"} flex h-[467px] flex-col justify-between rounded-[40px] pb-[51px]`}
    >
      <div className="flex justify-center">
        <div className="flex flex-col items-start justify-center gap-[40px]">
          {isSecond ? <Second /> : <Third />}
          <div className="float-start flex flex-col gap-3">
            <div className="flex size-[48px] items-center justify-center rounded-xl border border-border-primary border-opacity-10 bg-background-secondary shadow-[0px_0px_12px_2px_#00000040]">
              {isSecond ? (
                <Message width={24} height={24} />
              ) : (
                <Done width={24} height={24} />
              )}
            </div>
            <h3 className="text-lg font-medium leading-[21px] text-white xl:text-2xl">
              {headings[variant][0]}
              <br />
              {headings[variant][1]}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
