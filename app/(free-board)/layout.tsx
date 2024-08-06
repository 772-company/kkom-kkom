import AddBoard from "./_components/add-board";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative mx-4 md:mx-6 xl:mx-auto xl:max-w-[1200px]">
        {children}
        <AddBoard />
      </div>
    </>
  );
}
