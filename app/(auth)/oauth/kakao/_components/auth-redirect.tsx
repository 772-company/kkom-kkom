"use client";

import { oauthLogin } from "@/lib/apis/auth";
import { showToast } from "@/lib/show-toast";
import { setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthRedirectProps {
  provider: "KAKAO" | "GOOGLE";
}

export default function AuthRedirect({ provider }: AuthRedirectProps) {
  const router = useRouter();
  const [code, setCode] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);

  useEffect(() => {
    // URL에서 파라미터 추출 함수
    const extractParams = () => {
      const url = new URL(window.location.href);
      const codeParam = url.searchParams.get("code");
      const stateParam = url.searchParams.get("state");
      setCode(codeParam);
      setState(stateParam);
    };

    if (typeof window !== "undefined") {
      extractParams();
    }
  }, []);

  useEffect(() => {
    // 로그인 처리 함수
    const handleLogin = async () => {
      if (code && state) {
        try {
          const response = await oauthLogin(state, code, provider);

          setCookie("accessToken", response.accessToken, { maxAge: 60 * 60 });
          setCookie("refreshToken", response.refreshToken);

          router.push("/");
          router.refresh();
        } catch (error) {
          router.push("/login");
          showToast("error", <p>로그인 실패, 다시 시도해 주세요</p>);
        }
      }
    };

    if (code && state) {
      handleLogin();
    }
  }, [code, state, provider, router]);

  return null;
}
