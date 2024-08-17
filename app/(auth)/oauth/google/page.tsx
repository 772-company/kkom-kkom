import AuthRedirect from "../_components/auth-redirect";

export default function Page() {
  return (
    <div>
      <h2>
        구글 계정으로
        <br /> 로그인하고 있어요.
      </h2>
      <AuthRedirect provider="GOOGLE" />
    </div>
  );
}
