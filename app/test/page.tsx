"use client";

import Button, { LinkButton } from "@/components/button";
import ButtonFloating from "@/components/button-floating";
import IconButton from "@/components/button/Icon-button";
import { Dropdown } from "@/components/dropdown/dropdown";
import { BasicInput } from "@/components/input-field/basic-input";
import PasswordInput from "@/components/input-field/password-input";
import { useModalStore } from "@/providers/modal-store-provider";
import hamster from "@/public/images/hamster.jpg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export default function Home() {
  const [example, setExample] = useState("드롭다운");
  interface ExampleInput {
    email: string;
    password: string;
  }
  // NOTE - yup 스키마 정의 예시
  const exampleSchema = yup.object().shape({
    email: yup
      .string()
      .email("email 형식을 입력해주세요")
      .required("이메일을 입력해 주세요"),
    password: yup
      .string()
      .min(8, "비밀번호는 최소 8자리 이상이어야 합니다")
      .max(15, "비밀번호는 최대 15자리 이하여야 합니다")
      .required("비밀번호를 입력해 주세요"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExampleInput>({
    resolver: yupResolver(exampleSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ExampleInput> = (data) => {
    console.log(data);
  };
  const { isOpen, openModal, closeModal } = useModalStore((store) => store);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5">
        <ButtonFloating btnStyle="solid" btnSize="large" className="w-[300px]">
          floating-solid-large
        </ButtonFloating>
        <ButtonFloating btnStyle="solid" btnSize="medium" className="w-[300px]">
          floating-solid-medium
        </ButtonFloating>
        <ButtonFloating
          btnStyle="outlined"
          btnSize="large"
          className="w-[300px]"
        >
          floating-outlined-large
        </ButtonFloating>
      </div>

      <form
        className="mt-6 flex flex-col gap-2 px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <BasicInput<ExampleInput>
          register={register}
          id="email"
          placeholder="이메일을 입력해 주세요"
          type="email"
          label="이메일"
          error={errors.email?.message}
        />
        <PasswordInput<ExampleInput>
          register={register}
          id="password"
          placeholder="비밀번호를 입력해 주세요"
          label="비밀번호"
          error={errors.password?.message}
        />
        <button type="submit" className="bg-amber-200">
          Submit
        </button>
      </form>
      <div className="m-auto mt-14 w-44 bg-blue-200">
        {isOpen && <div>모달 열림</div>}
        <button onClick={openModal}>모달 열기</button>
        <button onClick={closeModal}>모달 닫기</button>
        <Dropdown defaultSelected={example}>
          <Dropdown.Button>▽</Dropdown.Button>
          <Dropdown.Body styles="w-36 bg-blue-200">
            <Dropdown.Item>
              <div className="flex gap-2">
                <p>Seo</p>
                <span>Young</span>
              </div>
            </Dropdown.Item>
            <Dropdown.Item>young</Dropdown.Item>
          </Dropdown.Body>
        </Dropdown>
      </div>
      <div className="mx-60">요소 밀리는지 확인!!</div>
      <div>
        <h2>버튼</h2>
        <div>
          <Button btnSize="large" btnStyle="solid" className="w-[280px]">
            solid large
          </Button>
          <Button btnSize="x-small" btnStyle="solid" className="">
            solid x-small
          </Button>
          <Button btnSize="large" btnStyle="outlined" className="w-[280px]">
            outlined large
          </Button>
          <Button btnSize="x-small" btnStyle="outlined" className="">
            outlined x-small
          </Button>
          <Button btnSize="large" btnStyle="danger" className="w-[280px]">
            danger large
          </Button>
          <Button disabled btnSize="x-small" btnStyle="solid" className="">
            disabled
          </Button>
          <Button
            btnSize="large"
            btnStyle="outlined_secondary"
            className="w-[280px]"
          >
            outlined_secondary large
          </Button>
          <Button btnSize="x-small" btnStyle="outlined_secondary" className="">
            outlined_secondary x-small
          </Button>
        </div>
        <div className="flex gap-[10px]">
          <LinkButton
            btnSize="x-small"
            btnStyle="outlined_secondary"
            href="/merong"
            className="w-[280px]"
          >
            outlined_secondary x-small
          </LinkButton>
          <LinkButton
            btnSize="large"
            btnStyle="gradient"
            href="/merong"
            className="w-[280px]"
          >
            gradient
          </LinkButton>
          <IconButton
            src={hamster}
            alt="햄스터"
            onClick={() => console.log("난 햄스터다.")}
            className="h-[100px] w-[100px] object-cover"
          />
        </div>
      </div>
    </>
  );
}
