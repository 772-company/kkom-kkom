"use client";

import Button, { LinkButton } from "@/components/button";
import ButtonFloating from "@/components/button-floating/button-floating";
import IconButton from "@/components/button/Icon-button";
import { Dropdown } from "@/components/dropdown/dropdown";
import { BasicInput } from "@/components/input-field/basic-input";
import PasswordInput from "@/components/input-field/password-input";
import Modal from "@/components/modal";
import { ModalDanger } from "@/components/modal/modal-danger";
import { ModalDetailedOneButton } from "@/components/modal/modal-detailed-one-button";
import { ModalDetailedTwoButton } from "@/components/modal/modal-detailed-two-button";
import { ModalOneButton } from "@/components/modal/modal-one-button";
import { ModalTwoButton } from "@/components/modal/modal-two-button";
import { ModalWarning } from "@/components/modal/modal-warning";
import { PopupOneButton } from "@/components/modal/popup-one-button";
import Popover from "@/components/popover/popover";
import { showToast } from "@/lib/show-toast";
import { useModalStore } from "@/providers/modal-store-provider";
import hamster from "@/public/hamster.jpg";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

export default function Home() {
  const content = ["칠칠이 파이팅", "칠칠 투 꼼꼼", "렛츠고"];

  const [example, setExample] = useState("드롭다운");
  interface ExampleInput {
    email: string;
    password: string;
    passwordConfirm: string;
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
    passwordConfirm: yup
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
      <Modal button={<button>modalDanger 열기</button>}>
        <ModalDanger
          title="로그아웃 하시겠어요?"
          handleConfirm={() => console.log("삭제")}
          buttonDescription="삭제하기"
        />
      </Modal>
      <Modal button={<button>ModalDetailedOneButton 열기</button>}>
        <ModalDetailedOneButton
          title="할 일 만들기"
          description="할 일을 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다."
          label1="할 일 제목"
          label2="할 일 메모"
          placeholder1="할 일 제목을 입력해주세요."
          placeholder2="메모를 입력해주세요."
          handleConfirm={(value1, value2) => {
            console.log(value1, value2);
          }}
          buttonDescription="만들기"
        />
      </Modal>
      <Modal button={<button>modalDetailedTwoButton 열기</button>}>
        <ModalDetailedTwoButton
          title="비밀번호 변경하기"
          label1="새 비밀번호"
          label2="새 비밀번호 확인"
          placeholder1="새 비밀번호를 입력해주세요."
          placeholder2="새 비밀번호를 다시 입력해주세요."
          inputType1="password"
          inputType2="password"
          handleConfirm={(value1: string, value2: string) => {
            console.log(value1, value2);
          }}
          buttonDescription="변경하기"
        />
      </Modal>
      <Modal button={<button>ModalOneButton 열기</button>}>
        <ModalOneButton
          title="그룹 이름 변경"
          placeholder="그룹 이름을 입력해주세요."
          handleConfirm={(value) => console.log(value)}
          buttonDescription="변경하기"
        />
      </Modal>
      <Modal button={<button>ModalTwoButton 열기</button>}>
        <ModalTwoButton
          buttonDescription="링크 보내기"
          description="비밀번호 재설정 링크를 보내드립니다."
          inputType="email"
          handleConfirm={(value) => {
            console.log(value);
          }}
          placeholder="이메일을 입력하세요."
          title="비밀번호 재설정"
        />
      </Modal>
      <Modal button={<button>ModalWarning 열기</button>}>
        <ModalWarning
          title="회원 탈퇴를 진행하시겠어요?"
          description="그룹장으로 있는 그룹은 자동으로 삭제되고, 모든 그룹에서 나가집니다."
          handleConfirm={() => console.log("회원 탈퇴")}
          buttonDescription="회원 탈퇴"
        />
      </Modal>
      <Modal button={<button>PopupOneButton 열기</button>}>
        <PopupOneButton
          description="그룹에 참여할 수 있는 링크를 복사합니다."
          title="멤버 초대"
          handleConfirm={() => console.log("복사")}
          buttonDescription="복사하기"
        />
      </Modal>
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
        <PasswordInput<ExampleInput>
          register={register}
          id="passwordConfirm"
          readOnly
          value={123456789}
          label="비밀번호 변경"
        />
        <button type="submit" className="bg-amber-200">
          Submit
        </button>
      </form>
      <div className="flex h-[150px] flex-col items-center pt-[20px]">
        <Popover
          triggerText="팝오버 테스트"
          content={content}
          triggerClassName="bg-pink-200 w-[150px] h-[50px]"
          contentClassName="left-[-76px] h-[100px] w-[200px] bg-yellow-200"
        />
      </div>
      <div className="m-auto mt-14 w-44 bg-blue-200">
        <button onClick={() => showToast("warning", <p>토스트</p>)}>
          warning toast 열기
        </button>
        <button onClick={() => showToast("default", <p>토스트</p>)}>
          default toast 열기
        </button>
        <button onClick={() => showToast("info", <p>토스트</p>)}>
          info toast 열기
        </button>
        <button onClick={() => showToast("success", <p>토스트</p>)}>
          success toast 열기
        </button>
        <button onClick={() => showToast("error", <p>토스트</p>)}>
          error toast 열기
        </button>
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
