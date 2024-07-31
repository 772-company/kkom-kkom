import { ReactNode } from "react";

interface AuthLayout {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayout) {
  return (
    <div className="w-full px-4 pt-6 md:pt-[100px] xl:pt-[140px]">
      <div className="mx-auto min-w-[343px] max-w-[460px]">{children}</div>
    </div>
  );
}
