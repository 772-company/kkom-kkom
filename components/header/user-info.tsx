import { getUser } from "@/app/action";
import UserIcon from "@/public/icons/user.svg";

export default async function UserInfo() {
  const userInfo = await getUser();
  return (
    <div className="flex items-center gap-2">
      <div className="size-6 xl:size-4">
        <UserIcon width={"100%"} height={"100%"} />
      </div>
      <p className="hidden text-sm font-medium text-text-primary xl:block">
        {userInfo.nickname}
      </p>
    </div>
  );
}
