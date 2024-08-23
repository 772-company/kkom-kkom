import * as yup from "yup";

const updateUserSchema = yup.object().shape({
  nickname: yup.string().max(30, "닉네임은 최대 30자까지 가능합니다."),
  image: yup
    .mixed<File | string>()
    .test("fileOrString", "JPG, JPEG, PNG 파일만 가능합니다.", (value) => {
      if (typeof value === "string") {
        // NOTE - 문자열인 경우 유효성 검사 통과 (기본 이미지 URL 등)
        return true;
      }

      if (!value) return true; // NOTE - 파일이 선택되지 않았을 때는 유효성 검사 통과

      const fileType = value.type;
      return ["image/jpeg", "image/png", "image/jpg"].includes(fileType);
    }),
  password: yup.string(),
  email: yup.string(),
});

export default updateUserSchema;
