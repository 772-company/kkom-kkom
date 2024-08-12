export const metadata = {
  title: "계정 설정",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-full px-4 pt-6 md:px-6 xl:max-w-[792px] xl:pt-[40px]">
      {children}
    </div>
  );
}
