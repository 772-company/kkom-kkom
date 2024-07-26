import Image, { StaticImageData } from "next/image";

//
interface IconButtonProps {
  src: string | StaticImageData;
  alt: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  width?: number;
  height?: number;
}

const IconButton = ({
  src,
  alt,
  onClick,
  className,
  width,
  height,
}: IconButtonProps) => {
  return (
    <button type="button" onClick={onClick}>
      <Image
        width={width}
        height={height}
        src={src}
        alt={alt}
        className={`${className} rounded-full`}
      />
    </button>
  );
};

export default IconButton;
