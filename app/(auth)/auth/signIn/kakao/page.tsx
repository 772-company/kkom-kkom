import AuthRedirect from "./_components/auth-redirect";

export default function Page() {
  return (
    <div>
      <p>요청 처리 중에 띄울 로딩 스피너</p>
      <AuthRedirect provider="kakao" />
    </div>
  );
}
