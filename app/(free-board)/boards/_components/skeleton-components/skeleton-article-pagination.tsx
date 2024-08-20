import Button from "@/components/button/button";

export default function SkeletonPagination() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 animate-pulse border-t border-t-background-tertiary bg-background-secondary pb-2 pt-2">
      <ul className="mx-auto flex w-full max-w-[1200px] gap-2">
        <li className="flex-1">
          <Button
            btnSize="large"
            btnStyle="outlined"
            className="w-full"
            disabled
          ></Button>
        </li>
        <li className="flex-1">
          <Button
            btnSize="large"
            btnStyle="outlined"
            disabled
            className="w-full"
          ></Button>
        </li>
        {[1, 2, 3, 4, 5].map((i, index) => {
          return (
            <li className="flex-1" key={index}>
              <Button
                btnSize="large"
                btnStyle={index === 2 ? "solid" : "outlined"}
                disabled
                className="w-full"
              ></Button>
            </li>
          );
        })}
        <li className="flex-1">
          <Button
            btnSize="large"
            btnStyle="outlined"
            disabled
            className="w-full"
          ></Button>
        </li>
        <li className="flex-1">
          <Button
            btnSize="large"
            btnStyle="outlined"
            disabled
            className="w-full"
          ></Button>
        </li>
      </ul>
    </nav>
  );
}
