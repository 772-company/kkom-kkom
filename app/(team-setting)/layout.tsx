export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto w-full max-w-[343px] md:max-w-[696px] lg:max-w-[792px]">
      {children}
    </div>
  );
}
