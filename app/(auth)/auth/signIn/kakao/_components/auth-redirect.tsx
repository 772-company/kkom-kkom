"use client";

import { oauthLogin } from "@/lib/apis/auth";
import { showToast } from "@/lib/show-toast";
import { setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthRedirectProps {
  provider: string;
}

export default function AuthRedirect({ provider }: AuthRedirectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  useEffect(() => {
    const login = async () => {
      console.log(">>>>>>>>>>실행");
      if (code && state && provider) {
        try {
          const response = await oauthLogin(state, code, provider);

          setCookie("accessToken", response.accessToken, {
            maxAge: 60 * 60,
          });
          setCookie("refreshToken", response.refreshToken);

          router.push("/");
          router.refresh();
          showToast("success", <p>로그인</p>);
        } catch (error) {
          console.error("Login failed:", error);
          // 에러 처리 로직을 여기에 추가
        }
      }
    };

    // 비동기 함수 호출
    login();
  }, [code, state, provider, router]);

  return null;
}
