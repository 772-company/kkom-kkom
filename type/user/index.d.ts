export interface LoginInputValue {
  email: string;
  password: string;
}
export interface SignUpInputValue {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export interface SendEmailInputValue {
  email: string;
}

export interface ResetPasswordInputValue {
  passwordConfirmation: string;
  password: string;
}

export interface UpdateUserInputValue {
  nickname?: string;
  image?: File | string;
  password?: string;
  email?: string;
}
