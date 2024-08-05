import CheckBoxActive from "@/public/icons/checkbox-active.svg";
import CheckboxDefault from "@/public/icons/checkbox-default.svg";
import React from "react";

interface CheckBoxProps {
  isActive: boolean;
}
const CheckBox = ({ isActive }: CheckBoxProps) => {
  return (
    <button>
      {isActive ? (
        <CheckBoxActive width={16} height={16} />
      ) : (
        <CheckboxDefault width={16} height={16} />
      )}
    </button>
  );
};

export default CheckBox;
