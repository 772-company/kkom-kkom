import * as yup from "yup";

export const addTeamSchema = yup.object().shape({
  teamProfile: yup
    .mixed<File>()
    .test("fileOrString", "JPG, JPEG, PNG 파일만 가능합니다.", (value) => {
      if (!value) return true; // NOTE - 파일이 선택되지 않았을 때는 유효성 검사 통과
      const fileType = value.type;
      return ["image/jpeg", "image/png", "image/jpg"].includes(fileType);
    }),
  teamName: yup.string().required("팀 이름을 입력해 주세요."),
});

export const editTeamSchema = yup.object().shape({
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
  teamName: yup.string(),
});
