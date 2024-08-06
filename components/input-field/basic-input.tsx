import { InputHTMLAttributes } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface BasicInputProps<TFormInput extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  id: Path<TFormInput>;
  register: UseFormRegister<TFormInput>;
  label?: string;
  error?: string;
  isModal?: boolean;
  className?: string;
}

/**
 * @author 김서영
 * 기본적으로 사용되는 input입니다.
 * @param rest:  placeholder,type 등이 옵니다.
 * @param id: 해당 input에 대한 id 입니다.(=name)
 * @param label: 라벨이 사용되지 않는 경우가 있어 옵셔널을 주었습니다.
 * @param error: 유효성 검사에 어긋나는 경우 나타나는 에러 메세지입니다.
 * @param isModal: 모달에서 사용하는 경우 true로 지정하여 스타일을 다르게 줍니다.
 * @example
 * <BasicInput<ExampleInput>
          register={register}
          id="email"
          placeholder="이메일을 입력해 주세요"
          type="email"
          label="이메일"
          error={errors.email?.message}
        />
 **/
export function BasicInput<TFormInput extends FieldValues>({
  register,
  id,
  label,
  error,
  isModal,
  className,
  ...rest
}: BasicInputProps<TFormInput>) {
  return (
    <>
      <div className={`flex flex-col ${isModal ? "gap-2" : "gap-3"}`}>
        {label && (
          <label
            htmlFor={id}
            className="text-base font-semibold text-text-primary"
          >
            {label}
          </label>
        )}
        <input
          className={`w-full rounded-xl border border-border-primary border-opacity-10 bg-background-secondary px-4 py-[13.5px] text-base font-normal text-text-primary placeholder:text-sm placeholder:font-normal placeholder:text-text-default read-only:cursor-not-allowed read-only:bg-background-tertiary focus:border-2 focus:outline-none ${error ? "focus:border-status-danger" : "focus:border-interaction-focus"} ${className}`}
          {...register(id)}
          {...rest}
          id={id}
        />
        {error && (
          <p className="ml-[13.5px] text-sm font-medium text-status-danger">
            {error}
          </p>
        )}
      </div>
    </>
  );
}
