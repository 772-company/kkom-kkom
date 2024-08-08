import AuthRedirect from "../_components/auth-redirect";

export default function Page() {
  return (
    <div>
      <h2>구글 로그인 중!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h2>
      <AuthRedirect provider="GOOGLE" />
    </div>
  );
}
