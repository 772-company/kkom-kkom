import { ReactNode } from "react";

export const metadata = {
  title: "리스트 페이지",
};

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}
