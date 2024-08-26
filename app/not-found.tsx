import NotFoundAnimation from "@/components/animation/not-found-animation";
import LinkButton from "@/components/button/link-button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center px-[20px]">
      <NotFoundAnimation />
      <div className="relative top-[-70px] flex flex-col items-center gap-4 md:gap-6">
        <h2 className="text-2xl text-text-primary md:text-4xl">
          찾을 수 없는 페이지입니다.
        </h2>
        <p className="text-center text-sm leading-6 text-text-secondary md:text-lg">
          요청하신 페이지가 사라졌거나, 잘못된 경로입니다. <br /> 올바른 URL을
          입력하였는지 확인하세요
        </p>
        <LinkButton
          href="/"
          className="w-[200px]"
          btnSize="large"
          btnStyle="solid"
        >
          메인으로 돌아가기
        </LinkButton>
      </div>
    </div>
  );
}
