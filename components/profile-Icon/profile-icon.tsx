import Image from "next/image";
import React, { useState } from "react";

interface ProfileIconProps {
  width: number;
  height: number;
  image: string | null;
  type: "teamProfile" | "myProfile";
}

/**
 * @author : 이동규
 * @typedef {Object} ProfileInputProps
 * @param {string} image - 서버에서 받아온 유저 이미지 URL
 * @param {string} preview - 미리보기 이미지 URL
 **/

const ProfileIcon = ({ image, type, width, height }: ProfileIconProps) => {
  return (
    <div>
      {type === "teamProfile" && (
        <Image
          width={width}
          height={height}
          className="rounded-full"
          src={image ? image : "/icons/img.svg"}
          alt="팀이미지"
        />
      )}

      {type === "myProfile" && (
        <Image
          className="rounded-full"
          width={width}
          height={height}
          src={image ? image : "/icons/default-profile.svg"}
          alt="나의이미지"
        />
      )}
    </div>
  );
};
export default ProfileIcon;
