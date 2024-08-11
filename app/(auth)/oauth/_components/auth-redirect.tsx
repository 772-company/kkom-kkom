"use client";

import { oauthLogin } from "@/lib/apis/auth";
import { myFetch } from "@/lib/apis/myFetch";
import { getGoogleTokenResponse } from "@/lib/apis/type";
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
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);

  useEffect(() => {
    const codeParam = searchParams.get("code");
    const stateParam = searchParams.get("state");

    if (codeParam && stateParam) {
      setCode(codeParam);
      setState(stateParam);
    }
  }, [searchParams]);

  useEffect(() => {
    // 로그인 처리 함수
    const handleLogin = async () => {
      if (code && state) {
        try {
          let finalCode = code;
          if (provider === "GOOGLE") {
            const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL;
            const tokenResponse = await myFetch<getGoogleTokenResponse>(
              "https://oauth2.googleapis.com/token",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  code,
                  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                  client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY,
                  redirect_uri: redirectUri,
                  grant_type: "authorization_code",
                }),
              },
            );

            finalCode = tokenResponse.id_token;
          }

          const response = await oauthLogin(state, finalCode, provider);

          setCookie("accessToken", response.accessToken, { maxAge: 60 * 60 });
          setCookie("refreshToken", response.refreshToken);

          router.push("/");
          router.refresh();
        } catch (error) {
          console.log(error);
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
