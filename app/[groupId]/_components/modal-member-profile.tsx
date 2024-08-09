import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { showToast } from "@/lib/show-toast";
import DefaultProfile from "@/public/icons/default-profile.svg";
import XIcon from "@/public/icons/x.svg";
import Image from "next/image";

interface ModalMemberProfileProps {
  close: () => void;
  userImage: string;
  userName: string;
  userEmail: string;
}

const ModalMemberProfile = ({
  close,
  userImage,
  userName,
  userEmail,
}: ModalMemberProfileProps) => {
  const handleButtonClick = async () => {
    try {
      await navigator.clipboard.writeText(userEmail);
      showToast("success", "이메일이 복사되었습니다");
    } catch (error) {
      showToast("error", "이메일 복사에 실패하였습니다");
    }

    close();
  };

  return (
    <Modal close={close} closeOnFocusOut>
      <div className="relative flex h-[218px] flex-col items-center justify-center gap-[8px]">
        <button className="absolute right-0 top-0" onClick={close}>
          <XIcon width={24} height={24} />
        </button>
        <div className="flex w-full flex-col justify-center gap-[24px] pt-[32px]">
          <div className="flex flex-col items-center gap-[24px]">
            {userImage ? (
              <Image
                src={userImage}
                alt="프로필 이미지"
                width={52}
                height={52}
                className="rounded-full"
              />
            ) : (
              <DefaultProfile className="h-[52px] w-[52px]" />
            )}

            <div className="flex flex-col items-center gap-[8px]">
              <p className="text-[14px] font-[500] text-text-primary">
                {userName}
              </p>
              <p className="text-[12px] font-[400] text-text-secondary">
                {userEmail}
              </p>
            </div>
          </div>

          <Button btnSize="large" btnStyle="solid" onClick={handleButtonClick}>
            이메일 복사하기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalMemberProfile;
