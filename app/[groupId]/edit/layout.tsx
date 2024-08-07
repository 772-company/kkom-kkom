export const metadata = {
  title: "팀 수정하기",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-full max-w-[343px] md:max-w-[460px]">
      {children}
    </div>
  );
}
