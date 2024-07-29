import Check from "@/app/public/icons/check.svg";
import Plus from "@/app/public/icons/plus.svg";

const FUNDAMENTAL =
  "flex items-center justify-center gap-1 rounded-[40px] shadow-xl";

const SOLID = "";

const OUTLINED = "";

const LARGE = "h-12 w-[125px] px-[21px] py-[14px] text-base font-semibold";

const MEDIUM = "";

interface ButtonFloatingProps {
  style: "solid" | "outlined";
  size: "large" | "medium";
  children: React.ReactNode;
}

export default function ButtonFloating({
  style,
  size,
  children,
}: ButtonFloatingProps) {
  return (
    <button className="h-12 w-[125px] px-[21px] py-[14px] text-base font-semibold">
      <figure className={`${FUNDAMENTAL} ${LARGE}`}>
        {size === "large" ? (
          <Plus className="h-4 w-4" />
        ) : (
          <Check className="h-4 w-4" />
        )}
        {children}
      </figure>
    </button>
  );
}
