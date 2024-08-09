import * as PopoverPrimitive from "@radix-ui/react-popover";
import classNames from "classnames";
import Image, { StaticImageData } from "next/image";
import * as React from "react";

const PopOver = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={classNames(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 rounded-md border shadow-md outline-none",
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

interface PopoverContentItem {
  text: string | string[];
  onClick?: () => void;
}
interface PopoverProps {
  triggerImage?: string | StaticImageData;
  triggerImageAlt?: string;
  triggerSvg?: React.FC<React.SVGProps<SVGSVGElement>>;
  triggerText?: string;
  triggerWidth?: number;
  triggerHeight?: number;
  content: PopoverContentItem[];
  className?: string;
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
   * @param content : content에 들어갈 텍스트와 각 content의 onClick 이벤트를 입력합니다.
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
            content={[
            { text: "수정하기", onClick: () => console.log("수정하기 클릭") },
            { text: "삭제하기", onClick: () => console.log("삭제하기 클릭") },
            ]}
            triggerClassName="bg-pink-200 w-[150px] h-[50px]"
            contentClassName="left-[-77px] h-[100px] w-[200px] bg-yellow-200"
          />
   */
const Popover = ({
  triggerImage,
  triggerImageAlt,
  triggerSvg: TriggerSvg,
  triggerText,
  triggerWidth,
  triggerHeight,
  content,
  className,
  triggerClassName,
  contentClassName,
}: PopoverProps) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PopOver open={open} onOpenChange={setOpen}>
      <div className={`${className}`}>
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
            {TriggerSvg && (
              <TriggerSvg width={triggerWidth} height={triggerHeight} />
            )}
            <p>{triggerText}</p>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className={`${contentClassName} flex flex-col items-center justify-center border-0 shadow-none`}
        >
          {content.map((item, index) => (
            <button
              className="h-full w-full text-[14px] hover:text-[15px]"
              key={index}
              onClick={() => {
                item.onClick && item.onClick();
                handleClose();
              }}
            >
              {item.text}
            </button>
          ))}
        </PopoverContent>
      </div>
    </PopOver>
  );
};

export default Popover;
