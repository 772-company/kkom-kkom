import CheckBoxActive from "@/public/icons/checkbox-active.svg";

export default function DateBoxListSkeleton() {
  return (
    <section className="mt-[27px] flex flex-col gap-10 md:mt-6">
      {[1, 2, 3].map((v) => (
        <section key={v}>
          <header className="mb-4 h-[19px] w-[110px] animate-pulse rounded-md bg-background-tertiary"></header>
          <div className="flex flex-col gap-4">
            {[4, 5, 6].map((v) => (
              <section
                key={v}
                className="h-11 w-full animate-pulse rounded-lg bg-background-tertiary px-[14px] py-[10px]"
              ></section>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
