"use client";

import { KAKAO_OAUTH_URL } from "@/constants/oauth";
import Google from "@/public/icons/google.svg";
import KakaoTalk from "@/public/icons/kakao-talk.svg";
import Link from "next/link";
import { useEffect, useState } from "react";

interface EasyLoginButtonProps {
  domain: "kakao" | "google";
}

function generateState() {
  return Math.random().toString(36).substring(2);
}

export default function EasyLoginButton({ domain }: EasyLoginButtonProps) {
  const [kakaoOauthUrl, setKakaoOauthUrl] = useState("");
  const isKaKaoTalk = domain === "kakao";

  useEffect(() => {
    if (domain === "kakao") {
      const state = generateState();
      sessionStorage.setItem("kakao_state", state);
      setKakaoOauthUrl(`${KAKAO_OAUTH_URL}&state=${state}`);
    }
  }, [domain]);

  return (
    <Link
      href={isKaKaoTalk ? kakaoOauthUrl : ""}
      className={`flex size-[42px] items-center justify-center rounded-full ${isKaKaoTalk ? "bg-[#F5E14B]" : "bg-[#F9FAFB]"}`}
    >
      {isKaKaoTalk ? (
        <KakaoTalk width={26} height={24} />
      ) : (
        <Google width={26} height={24} />
      )}
    </Link>
  );
}
