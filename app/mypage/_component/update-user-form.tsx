import { BasicInput } from "@/components/input-field/basic-input";

interface UpdateUserFormProps {
  image: string | null;
  nickname: string;
  email: string;
}

interface UpdateUserInputValue {
  nickname: string;
  image: File | null;
  email: string;
}

export default function UpdateUserForm({
  image,
  nickname,
  email,
}: UpdateUserFormProps) {
  return <form></form>;
}
