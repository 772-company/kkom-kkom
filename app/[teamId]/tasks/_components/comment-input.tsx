import React from "react";
import { useForm } from "react-hook-form";

import TaskButton from "./tasks-button";

const Commentinput = () => {
  const {
    watch,
    formState: { isDirty },
    setValue,
    getValues,
    register,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    defaultValues: { value: "" },
  });
  const serveData = (
    data: { value: string },
    event?: React.BaseSyntheticEvent,
  ) => {
    if (!data.value) {
      return;
    }
    setValue("value", "", { shouldDirty: true });
    isDirty;
  };

  return (
    <form className="relative w-full" onSubmit={handleSubmit(serveData)}>
      <input
        {...register("value")}
        placeholder="댓글을 달아주세요"
        className="bg-b h-[24px] w-full bg-background-secondary text-sm text-text-default text-text-primary placeholder:font-normal"
      />
      <TaskButton
        type="submit"
        types="submit"
        disable={isDirty ? false : true}
      />
    </form>
  );
};

export default Commentinput;
