import EasyLoginButton from "./easy-login-button";

interface EasyLoginProps {
  variant: string;
}

export default function EasyAuth({ variant }: EasyLoginProps) {
  return (
    <>
      <div>
        <p className="flex basis-[100%] items-center text-base font-medium text-white before:mr-6 before:h-[1px] before:grow before:bg-border-primary before:bg-opacity-10 before:text-[0px] before:content-[''] after:ml-6 after:h-[1px] after:grow after:bg-border-primary after:bg-opacity-10 after:text-[0px] after:content-['']">
          OR
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-base font-medium text-white">간편 {variant}하기</p>
        <div className="flex gap-4">
          <EasyLoginButton domain="kakao" />
          <EasyLoginButton domain="google" />
        </div>
      </div>
    </>
  );
}
