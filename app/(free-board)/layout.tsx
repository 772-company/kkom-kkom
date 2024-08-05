export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-full max-w-[343px] md:max-w-[696px] xl:max-w-[1200px]">
      {children}
    </div>
  );
}
