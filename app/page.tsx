import LandingCard from "@/components/landing/landing-card";
import LandingFirstCard from "@/components/landing/landing-first-card";
import LandingHeader from "@/components/landing/landing-header";
import footer from "@/public/images/landing-footer-large.png";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <div className="flex flex-col gap-6 px-4 xl:gap-[80px]">
        <LandingFirstCard />
        <LandingCard variant="second" />
        <LandingCard variant="third" />
      </div>
      {/* <footer className="relative h-[547px] w-full">
        <Image src={footer} fill alt="꼼꼼 랜딩" className="object-cover" />
      </footer> */}
    </>
  );
}
