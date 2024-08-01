import Google from "@/public/icons/google.svg";
import KakaoTalk from "@/public/icons/kakao-talk.svg";

interface EasyLoginButtonProps {
  domain: "kakaoTalk" | "google";
}

export default function EasyLoginButton({ domain }: EasyLoginButtonProps) {
  const isKaKaoTalk = domain === "kakaoTalk";

  return (
    <button
      className={`flex size-[42px] items-center justify-center rounded-full ${isKaKaoTalk ? "bg-[#F5E14B]" : "bg-[#F9FAFB]"}`}
    >
      {isKaKaoTalk ? (
        <KakaoTalk width={26} height={24} />
      ) : (
        <Google width={26} height={24} />
      )}
    </button>
  );
}
