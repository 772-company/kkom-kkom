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
      "비밀번호는 숫자, 영문, 특수문자(!@#$%^&*)를 포함해야 합니다.",
    )
    .required("비밀번호를 입력해 주세요"),
});

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("이메일 형식으로 작성해 주세요")
    .required("이메일을 입력해 주세요"),
  nickname: yup
    .string()
    .max(30, "닉네임은 최대 30자까지 가능합니다.")
    .required("닉네임을 입력해 주세요."),
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자 이상입니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "비밀번호는 숫자, 영문, 특수문자(!@#$%^&*)를 포함해야 합니다.",
    )
    .required("비밀번호를 입력해 주세요"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해 주세요"),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "비밀번호는 최소 8자 이상입니다.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "비밀번호는 숫자, 영문, 특수문자(!@#$%^&*)를 포함해야 합니다.",
    )
    .required("비밀번호를 입력해 주세요"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해 주세요"),
});

export const sendEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("이메일 형식으로 작성해 주세요")
    .required("이메일을 입력해 주세요"),
});
