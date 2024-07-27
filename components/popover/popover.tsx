import {
  Popover as PopOver,
  PopoverContent,
  PopoverTrigger,
} from "@/components/popover/popover-setting";
import Image, { StaticImageData } from "next/image";

interface popoverProps {
  triggerImage?: string | StaticImageData;
  triggerImageAlt?: string;
  triggerText?: string;
  triggerWidth?: number;
  triggerHeight?: number;
  content: string[];
  triggerClassName?: string;
  contentClassName?: string;
}

/**
   * 기본적인 스타일만 입힌 popover 컴포넌트입니다
   * @auth 정지현
   * @param triggerImage : trigger image의 주소를 입력합니다.
   * @param triggerImageAlt : trigger image의 대체 텍스트를 입력합니다.
   * @param triggerText : trigger 텍스트를 입력합니다.
   * @param triggerWidth : trigger image의 width를 입력합니다.
   * @param triggerHeight : trigger image의 height를 입력합니다.
   * @param content : content에 들어갈 텍스트를 입력합니다.
   * @param triggerClassName : trigger에 필요한 추가적인 css를 입력합니다.
   * @param contentClassName : content에 필요한 추가적인 css를 입력합니다.
   * @returns 팝오버 컴포넌트를 반환합니다.
   * @example
   * <Popover
            triggerImage={hamster}
            triggerImageAlt="hamster"
            triggerText="나는야햄스터"
            triggerWidth={30}
            triggerHeight={30}
            content={content}
            triggerClassName="bg-pink-200 w-[150px] h-[50px]"
            contentClassName="left-[-77px] h-[100px] w-[200px] bg-yellow-200"
          />
   */
const Popover = ({
  triggerImage,
  triggerImageAlt,
  triggerText,
  triggerWidth,
  triggerHeight,
  content,
  triggerClassName,
  contentClassName,
}: popoverProps) => {
  return (
    <PopOver>
      <PopoverTrigger>
        <div
          className={`${triggerClassName} flex items-center justify-center gap-[5px]`}
        >
          {triggerImage && triggerImageAlt && (
            <Image
              src={triggerImage}
              alt={triggerImageAlt}
              width={triggerWidth}
              height={triggerHeight}
              className="object-cover"
              layout="fixed"
            />
          )}
          <p>{triggerText}</p>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={`${contentClassName} absolute flex flex-col items-center justify-center border-0 shadow-none`}
      >
        {content.map((item, index) => (
          <button key={index}>{item}</button>
        ))}
      </PopoverContent>
    </PopOver>
  );
};

export default Popover;
