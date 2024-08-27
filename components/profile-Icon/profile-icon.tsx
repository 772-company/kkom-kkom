import DefaultImage from "@/public/icons/default-profile.svg";
import TeamImage from "@/public/icons/image.svg";
import Image from "next/image";
import React from "react";

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
 */

export default function ProfileIcon({
  image,
  type,
  width,
  height,
}: ProfileIconProps) {
  return (
    <div>
      {type === "teamProfile" &&
        (image ? (
          <Image
            width={width}
            height={height}
            className="rounded-full"
            src={image || "/icons/img.svg"}
            alt="팀이미지"
          />
        ) : (
          <TeamImage width={width} height={height} />
        ))}

      {type === "myProfile" &&
        (image ? (
          <Image
            className="rounded-full"
            width={width}
            height={height}
            src={image}
            alt="나의이미지"
          />
        ) : (
          <DefaultImage width={width} height={height} />
        ))}
    </div>
  );
}
