import { getUser } from "@/lib/apis/user";

import UpdateUserForm from "./_component/update-user-form";

export default async function Page() {
  const { image, nickname, email } = await getUser();
  return (
    <>
      <h1 className="text-lg font-bold text-text-primary md:text-xl">
        계정 설정
      </h1>
      <UpdateUserForm image={image} nickname={nickname} email={email} />
    </>
  );
}
