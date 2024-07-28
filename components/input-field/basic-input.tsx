import { InputHTMLAttributes } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface BasicInputProps<TFormInput extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  id: Path<TFormInput>;
  register: UseFormRegister<TFormInput>;
  label?: string;
  error?: string;
}

/**
 * @author 김서영
 * @param rest:  placeholder,type 등이 옵니다.
 * @param id: 해당 input에 대한 id 입니다.(=name)
 * @param label: 라벨이 사용되지 않는 경우가 있어 옵셔널을 주었습니다.
 * @param error: 유효성 검사에 어긋나는 경우 나타나는 에러 메세지입니다.
 **/
export function BasicInput<TFormInput extends FieldValues>({
  register,
  id,
  label,
  error,
  ...rest
}: BasicInputProps<TFormInput>) {
  return (
    <>
      <div className="flex flex-col gap-3">
        {label && <label className="text-base font-semibold"> {label} </label>}
        <input
          className={`w-full rounded-xl border border-border-primary border-opacity-10 bg-background-secondary px-4 py-[13.5px] text-sm font-normal placeholder:text-text-default focus:border-2 focus:outline-none ${error ? "focus:border-status-danger" : "focus:border-interaction-focus"}`}
          {...register(id)}
          {...rest}
        />
      </div>
      {error && (
        <p className="ml-[13.5px] mt-2 text-sm font-medium text-status-danger">
          {error}
        </p>
      )}
    </>
  );
}
