import UserIcon from "@/public/icons/user.svg";

interface PopoverTriggerProps {
  nickname: string;
}

export default function PopoverTrigger({ nickname }: PopoverTriggerProps) {
  return (
    <div className="flex cursor-pointer items-center gap-2">
      <div className="size-6 xl:size-4">
        <UserIcon width={"100%"} height={"100%"} />
      </div>
      <p className="hidden text-sm font-medium text-text-primary xl:block">
        {nickname}
      </p>
    </div>
  );
}
