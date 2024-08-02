export const metadata = {
  title: "소속된 팀이 없습니다.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-full max-w-[312px] md:max-w-[520px] xl:max-w-[810px]">
      {children}
    </div>
  );
}
