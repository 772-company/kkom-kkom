import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("이메일 형식으로 작성해 주세요")
    .required("이메일을 입력해 주세요"),
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자 이상입니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.",
    )
    .required("비밀번호를 입력해 주세요"),
});
