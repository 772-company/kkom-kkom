export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="text-sm font-normal text-text-secondary md:text-base">
      {children}
    </section>
  );
}
