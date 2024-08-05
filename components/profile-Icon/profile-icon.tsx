import Image from "next/image";
import React, { HTMLAttributes, useState } from "react";

type ImageAttributes = HTMLAttributes<HTMLImageElement>;
interface ProfileIconProps {
  image: string;
  type: "teamProfile" | "myProfile";
}

/**
 * @author : 이동규
 * @typedef {Object} ProfileInputProps
 * @param {string} image - 서버에서 받아온 유저 이미지 URL
 * @param {string} preview - 미리보기 이미지 URL
 **/

const ProfileIcon = ({
  image,
  type,
  ...rest
}: ProfileIconProps & ImageAttributes) => {
  const [isImgError, setIsImgError] = useState<boolean>(false);
  const handleError = () => {
    setIsImgError(true);
  };

  return (
    <div>
      {type === "teamProfile" &&
        (isImgError ? (
          <img {...rest} src="/icons/img.svg" />
        ) : (
          <Image
            {...rest}
            className="rounded-full"
            src={image}
            onError={handleError}
            alt="팀이미지"
          />
        ))}

      {type === "myProfile" &&
        (isImgError ? (
          <img {...rest} src="/icons/my-profile.svg" alt="마이프로필" />
        ) : (
          <Image
            {...rest}
            className="rounded-full"
            src={image}
            onError={handleError}
            alt="나의이미지"
          />
        ))}
    </div>
  );
};
export default ProfileIcon;
