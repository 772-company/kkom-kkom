interface ButtonProps {
  text: string;
  color: "white" | "green" | "red" | "white/gray";
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?:
    | (() => Promise<void>)
    | ((e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>)
    | (() => void);
  className?: string; // e.g. width, height, ...
}

const Button = ({
  text,
  color,
  type,
  disabled,
  onClick,
  className,
}: ButtonProps) => {
  let primaryStyle = "";
  if (color === "white") {
    primaryStyle =
      "bg-white border-solid border-[1px] border-[#10B981] text-[#10B981] hover:border-[#059669] hover:text-[#059669] active:border-[#047857] active:text-[#047857] disabled:border-[#94A3B8] disabled:text-[#94A3B8]";
  } else if (color === "green") {
    primaryStyle =
      "text-white bg-[#10B981] hover:bg-[#059669] active:bg-[#047857] disabled:bg-[#94A3B8]";
  } else if (color === "red") {
    primaryStyle =
      "text-white bg-[#EF4444] hover:bg-[#df3131] active:bg-[#c22020]";
  } else {
    primaryStyle =
      "text-[#CBD5E1] bg-white border-solid border-[1px] border-[#CBD5E1] hover:text-[#b2bbc8] hover:border-[#b2bbc8] active:text-[#94A3B8] hover:border-[#94A3B8]";
  }

  return (
    <button
      type={type}
      className={`${className} ${primaryStyle} rounded-[12px] text-[16px] font-semibold`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
