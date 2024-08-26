import Button from "@/components/button/button";
import { BasicInput } from "@/components/input-field/basic-input";
import Modal from "@/components/modal/modal";
import { postTaskList } from "@/lib/apis/task-list";
import { addTodoListModalSchema } from "@/schemas/task";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

interface AddListModalProps {
  groupId: string;
  close: () => void;
}

function AddListModal({ groupId, close }: AddListModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { name: "" },
    resolver: yupResolver(addTodoListModalSchema),
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { name: string }) => postTaskList(groupId, data),
    onSuccess: () => {
      reset({ name: "" });
      close();
      queryClient.invalidateQueries({
        queryKey: ["getGroupInfo"],
      });
    },
  });
  const serveData = (data: { name: string }) => {
    if (data) {
      mutate(data);
    }
  };

  return (
    <Modal
      close={close}
      closeOnFocusOut
      className="flex h-[422px] w-full flex-col items-center justify-center overflow-auto md:w-[384px]"
    >
      <div className="flex h-[224px] w-[280px] flex-col">
        {isPending && <div className="self-center">로딩중...</div>}
        {!isPending && (
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(serveData)}
          >
            <header className="flex flex-col gap-4">
              <Modal.Title>새로운 목록 추가</Modal.Title>
              <Modal.Description>
                할 일에 대한 목록을 추가하고
                <br />
                목록별 할 일을 만들 수 있습니다.
              </Modal.Description>
              <BasicInput
                label="목록이름"
                placeholder="목록 이름을 입력해주세요."
                register={register}
                id="name"
                className="h-[48px]"
                isModal
              />
              {errors.name && <p>{errors.name.message}</p>}
            </header>

            <Button
              disabled={isPending}
              type="submit"
              btnSize="large"
              btnStyle="solid"
              className="w-[280px]"
            >
              만들기
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
}

export default AddListModal;
