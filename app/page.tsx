import Footer from "@/components/landing/footer";
import LandingCard from "@/components/landing/landing-card";
import LandingFirstCard from "@/components/landing/landing-first-card";
import LandingHeader from "@/components/landing/landing-header";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <div className="mx-auto flex w-full flex-col justify-center gap-6 overflow-hidden px-4 xl:gap-[80px]">
        <LandingFirstCard />
        <LandingCard variant="second" />
        <LandingCard variant="third" />
      </div>
      <Footer />
    </>
  );
}
