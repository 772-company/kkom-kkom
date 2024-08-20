import * as yup from "yup";

// name: "",
// description: "",
// startDate: date,
// frequencyType: "ONCE",
// monthDay: 0,
// weekDays: [],
// },
export const addTodoModalSchema = yup.object().shape({
  name: yup.string().required("제목을 입력하세요"),
  weekDays: yup.array().of(yup.number().defined()).optional(),
  description: yup.string(),
  frequencyType: yup
    .string()
    .oneOf(["ONCE", "DAILY", "WEEKLY", "MONTHLY"], "Invalid frequency type")
    .required("Frequency type is required"),
});
export const addTodoListModalSchema = yup
  .object()
  .shape({ name: yup.string().required("목록명을 입력하세요.") });
