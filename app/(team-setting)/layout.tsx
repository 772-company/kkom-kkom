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
