"use client";

import { GOOGLE_OAUTH_URL, KAKAO_OAUTH_URL } from "@/constants/oauth";
import Image from "next/image";
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
  }, [isKaKaoTalk]);

  return (
    <Link
      href={oauthUrl}
      className={`flex size-[42px] items-center justify-center rounded-full ${isKaKaoTalk ? "bg-[#F5E14B]" : "bg-[#F9FAFB]"}`}
    >
      {isKaKaoTalk ? (
        <Image
          src="/icons/kakao-talk.svg"
          alt="카카오톡 간편 로그인"
          width={26}
          height={26}
        />
      ) : (
        <Image
          src="/icons/google.svg"
          alt="구글 간편 로그인"
          width={26}
          height={26}
        />
      )}
    </Link>
  );
}
