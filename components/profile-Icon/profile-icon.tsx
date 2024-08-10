import Image from "next/image";
import React, { useState } from "react";

interface ProfileIconProps {
  width: number;
  height: number;
  image: string;
  type: "teamProfile" | "myProfile";
}

/**
 * @author : 이동규
 * @typedef {Object} ProfileInputProps
 * @param {string} image - 서버에서 받아온 유저 이미지 URL
 * @param {string} preview - 미리보기 이미지 URL
 **/

const ProfileIcon = ({ image, type, width, height }: ProfileIconProps) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (type === "teamProfile") {
      return (e.currentTarget.src = "/icons/img.svg");
    } else if (type === "myProfile") {
      return (e.currentTarget.src = "/icons/my-profile.svg");
    }
  };

  return (
    <div>
      {type === "teamProfile" && (
        <Image
          width={width}
          height={height}
          className="rounded-full"
          src={image}
          onError={handleError}
          alt="팀이미지"
        />
      )}

      {type === "myProfile" && (
        <Image
          className="rounded-full"
          width={width}
          height={height}
          src={image}
          onError={handleError}
          alt="나의이미지"
        />
      )}
    </div>
  );
};
export default ProfileIcon;
