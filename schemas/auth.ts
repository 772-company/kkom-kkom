import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("email 형식을 입력해주세요")
    .required("이메일을 입력해 주세요"),
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자리 이상이어야 합니다")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "비밀번호는 숫자, 영문자, 특수문자(!@#$%^&*)를 포함해야 합니다",
    )
    .required("비밀번호를 입력해 주세요"),
});
