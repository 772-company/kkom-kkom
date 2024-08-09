export const metadata = {
  title: "팀 페이지",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative mx-4 md:mx-6 xl:mx-auto xl:max-w-[1200px]">
      {children}
    </div>
  );
}
