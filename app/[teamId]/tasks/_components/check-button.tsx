import CheckBoxActive from "@/public/icons/checkbox-active.svg";
import CheckboxDefault from "@/public/icons/checkbox-default.svg";
import React, { ButtonHTMLAttributes } from "react";

interface CheckButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
}
const CheckButton = ({ isActive, ...rest }: CheckButtonProps) => {
  return (
    <button {...rest}>
      {isActive ? (
        <CheckBoxActive width={16} height={16} />
      ) : (
        <CheckboxDefault width={16} height={16} />
      )}
    </button>
  );
};

export default CheckButton;
