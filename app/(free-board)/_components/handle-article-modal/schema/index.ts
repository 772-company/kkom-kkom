import { ObjectSchema, mixed, object, string } from "yup";

import { FormType } from "..";

function checkIfFilesAreTooBig(file: File): boolean {
  let valid = true;
  const size = file.size / 1024 / 1024;
  if (size > 10) {
    valid = false;
  }
  return valid;
}

export const articleFormSchema: ObjectSchema<FormType> = object().shape({
  title: string().required("제목을 꼭 입력해주세요!"),
  content: string().required("내용을 꼭 입력해주세요!"),
  image: mixed<File | string>()
    .required("이미지를 꼭 업로드해주세요.")
    .test("fileSize", "파일 사이즈가 너무 큽니다", (value) => {
      if (typeof value === "string") {
        return true;
      }
      return checkIfFilesAreTooBig(value);
    }),
});
