import { BasicInput } from "@/components/input-field/basic-input";
import PasswordInput from "@/components/input-field/password-input";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { useForm } from "react-hook-form";

// BasicInput Meta 설정
const basicInputMeta = {
  title: "Components/Input",
  component: BasicInput,
  argTypes: {},
} satisfies Meta<typeof BasicInput>;

export default { basicInputMeta };

type BasicStory = StoryObj<typeof BasicInput>;

// BasicInput 기본 템플릿 생성
const BasicTemplate: BasicStory["render"] = (args) => {
  const { register } = useForm();

  return <BasicInput {...args} register={register} />;
};

// BasicInput 상태별 스토리 정의
export const Default: BasicStory = {
  render: BasicTemplate,
  args: {
    id: "input",
    placeholder: "Enter your input",
  },
};

export const WithError: BasicStory = {
  render: BasicTemplate,
  args: {
    id: "input",
    placeholder: "Enter your input",
    error: "Input is required.",
  },
};

export const ReadOnly: BasicStory = {
  render: BasicTemplate,
  args: {
    id: "input",
    placeholder: "Enter your input",
    readOnly: true,
  },
};

// PasswordInput Meta 설정
const passwordInputMeta = {
  title: "Components/PasswordInput",
  component: PasswordInput,
  argTypes: {},
} satisfies Meta<typeof PasswordInput>;

export { passwordInputMeta };

type PasswordStory = StoryObj<typeof PasswordInput>;

// PasswordInput 기본 템플릿 생성
const PasswordTemplate: PasswordStory["render"] = (args) => {
  const { register } = useForm();

  return <PasswordInput {...args} register={register} />;
};

// PasswordInput 상태별 스토리 정의
export const PasswordDefault: PasswordStory = {
  render: PasswordTemplate,
  args: {
    id: "input",
    placeholder: "이메일을 입력하세요",
  },
};

export const PasswordWithError: PasswordStory = {
  render: PasswordTemplate,
  args: {
    id: "input",
    placeholder: "Enter your password",
    error: "에러메세지",
  },
};

export const PasswordReadOnly: PasswordStory = {
  render: PasswordTemplate,
  args: {
    id: "input",
    placeholder: "Enter your password",
    readOnly: true,
  },
};
