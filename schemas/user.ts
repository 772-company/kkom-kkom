import * as yup from "yup";

export const updateUserSchemas = yup.object().shape({
  nickname: yup
    .string()
    .max(30, "닉네임은 최대 30자까지 가능합니다.")
    .required("닉네임을 입력해 주세요."),
  email: yup.string().email("이메일 형식으로 작성해 주세요"),
});
