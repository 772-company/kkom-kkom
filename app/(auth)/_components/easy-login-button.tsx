"use client";

import { GOOGLE_OAUTH_URL, KAKAO_OAUTH_URL } from "@/constants/oauth";
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
  const [oauthUrl, setOauthUrl] = useState("");
  const isKaKaoTalk = domain === "kakao";

  useEffect(() => {
    const state = generateState();
    sessionStorage.setItem("state", state);
    if (isKaKaoTalk) {
      setOauthUrl(`${KAKAO_OAUTH_URL}&state=${state}`);
    } else {
      setOauthUrl(`${GOOGLE_OAUTH_URL}&state=${state}`);
    }
  }, []);

  return (
    <Link
      href={oauthUrl}
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
