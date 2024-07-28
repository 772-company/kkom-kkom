import EyeOff from "@/public/icons/eye-off.svg";
import EyeOn from "@/public/icons/eye-on.svg";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

import { BasicInput, BasicInputProps } from "./basic-input";

interface PasswordInputProps<TFormInput extends FieldValues>
  extends BasicInputProps<TFormInput> {}

/**
 * @author 김서영
 * @param rest: placeholder, type 등이 옵니다.
 * @param id: 해당 input에 대한 id 입니다.(=name)
 * @param label: 라벨이 사용되지 않는 경우가 있어 옵셔널을 주었습니다.
 * @param error: 유효성 검사에 어긋나는 경우 나타나는 에러 메세지입니다.
 **/
export default function PasswordInput<TFormInput extends FieldValues>({
  register,
  id,
  label,
  error,
  ...rest
}: PasswordInputProps<TFormInput>) {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <BasicInput
        type={showPassword ? "text" : "password"}
        register={register}
        id={id}
        label={label}
        error={error}
        {...rest}
      />
      <button
        type="button"
        onClick={handleToggleShowPassword}
        className="absolute right-4 top-[48px]"
      >
        {showPassword ? (
          <EyeOn width={24} height={24} />
        ) : (
          <EyeOff width={24} height={24} />
        )}
      </button>
    </div>
  );
}
