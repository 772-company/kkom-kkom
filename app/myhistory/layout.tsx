export const metadata = {
  title: "마이 히스토리",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-4 pb-20 md:mx-6 xl:mx-auto xl:max-w-[1200px]">
      {children}
    </div>
  );
}
