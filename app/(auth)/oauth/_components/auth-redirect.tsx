"use client";

import { oauthLogin } from "@/lib/apis/auth";
import { myFetch } from "@/lib/apis/myFetch";
import { getGoogleTokenResponse } from "@/lib/apis/type";
import { showToast } from "@/lib/show-toast";
import Spinner from "@/public/icons/tube-spinner.svg";
import loadingJson from "@/public/lotties/loading-earthworm.json";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Lottie from "react-lottie-player";

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

  const mutation = useMutation({
    mutationFn: async ({ code, state }: { code: string; state: string }) => {
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
              code: code,
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
              client_secret: process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY,
              redirect_uri: redirectUri,
              grant_type: "authorization_code",
            }),
          },
        );

        finalCode = tokenResponse.id_token;
      }

      return oauthLogin(state, finalCode, provider);
    },
    onSuccess: (response) => {
      setCookie("accessToken", response.accessToken, { maxAge: 60 * 60 });
      setCookie("refreshToken", response.refreshToken);
      router.push("/");
      router.refresh();
    },
    onError: () => {
      router.push("/login");
      showToast("error", <p>로그인 실패, 다시 시도해 주세요</p>);
    },
  });

  // NOTE - 의존성 배열에 mutation 포함하면 무한 요청됨
  useEffect(() => {
    if (code && state) {
      mutation.mutate({ code, state });
    }
  }, [code, state]);

  return (
    <>
      <h1 className="text-center text-2xl font-medium text-text-primary xl:text-[30px]">
        {provider === "KAKAO" ? "카카오" : "구글"} 계정으로 로그인하고 있어요.
      </h1>
      <div className="flex justify-center">
        {/* <Lottie
          loop
          animationData={loadingJson}
          play
          style={{ width: 350, height: 200 }}
        /> */}
        <Spinner width={120} height={120} className="mt-[30px]" />
      </div>
    </>
  );
}
