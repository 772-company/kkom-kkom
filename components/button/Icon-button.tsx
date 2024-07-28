import Image, { StaticImageData } from "next/image";

interface IconButtonProps {
  src: string | StaticImageData;
  alt: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const IMAGE_STYLE = "rounded-full";

/**
 * css를 입힌 아이콘 버튼 컴포넌트입니다. className으로 버튼의 스타일을 결정할 수 있습니다.
 * src로 이미지를 넣어 아이콘 버튼을 만들 수 있습니다.
 * @author 정지현, 이승현
 * @param src : 이미지 주소를 적습니다.
 * @param alt : 이미지의 대체 텍스트를 적습니다.
 * @param className : 추가적인 css를 넣습니다.
 * @param onClick : 클릭 이벤트를 넣습니다.
 * @returns 아이콘 컴포넌트를 반환합니다.
 * @example
 *  <IconButton
        src={hamster}
        alt="햄스터"
        onClick={() => console.log("난 햄스터다.")}
        className="h-[100px] w-[100px] object-cover"
      />
 */
const IconButton = ({ src, alt, onClick, className }: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative ${IMAGE_STYLE} ${className} object-cover`}
    >
      <Image className={`${IMAGE_STYLE}`} src={src} alt={alt} fill />
    </button>
  );
};

export default IconButton;
