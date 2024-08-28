"use client";

import LOGGED_IN_USER_CONTENT from "@/constants/popover-content";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import UserIcon from "@/public/icons/user.svg";
import { useRouter } from "next-nprogress-bar";

import Popover from "../popover/popover";
import ModalLogout from "./components/modal-logout";

interface PopoverTriggerProps {
  image: string | null;
  nickname: string;
}

export default function PopoverTrigger({
  nickname,
  image,
}: PopoverTriggerProps) {
  const modalLogoutOverlay = useCustomOverlay(({ close }) => (
    <ModalLogout close={close} />
  ));
  const router = useRouter();
  return (
    <div className="flex cursor-pointer items-center gap-2">
      <Popover
        triggerImage={image}
        triggerImageAlt="사용자 프로필"
        triggerSvg={image ? undefined : UserIcon}
        triggerHeight={24}
        triggerWidth={24}
        size="24px"
        content={[
          {
            text: LOGGED_IN_USER_CONTENT[0],
            onClick: () => router.push("/myhistory"),
          },
          {
            text: LOGGED_IN_USER_CONTENT[1],
            onClick: () => router.push("/mypage"),
          },
          {
            text: LOGGED_IN_USER_CONTENT[2],
            onClick: () => router.push("/participate-team"),
          },
          {
            text: LOGGED_IN_USER_CONTENT[3],
            onClick: modalLogoutOverlay.open,
          },
        ]}
        triggerText={nickname}
        triggerClassName="text-sm font-medium text-text-primary"
        contentClassName="z-10 border-[1px] bg-background-secondary border-border-primary/10 w-[120px] h-[160px] text-text-primary text-sm font-normal mt-3 md:w-[135px] md:h-[184px] md:text-base"
        className="flex items-center"
      />
    </div>
  );
}
