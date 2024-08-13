import Button from "@/components/button/button";

export default function SkeletonPagination() {
  return (
    <nav className="w-full max-w-[1200px] animate-pulse">
      <ul className="flex gap-2">
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
