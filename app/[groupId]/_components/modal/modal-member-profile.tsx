import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { showToast } from "@/lib/show-toast";
import Crown from "@/public/icons/crown.png";
import DefaultProfile from "@/public/icons/default-profile.svg";
import XIcon from "@/public/icons/x.svg";
import Image from "next/image";

interface ModalMemberProfileProps {
  close: () => void;
  userImage: string;
  userName: string;
  userEmail: string;
  isAdmin: boolean;
}

function ModalMemberProfile({
  close,
  userImage,
  userName,
  userEmail,
  isAdmin,
}: ModalMemberProfileProps) {
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
      <div className="relative flex h-[218px] flex-col items-center gap-[8px]">
        <button
          className="absolute right-0 top-0"
          onClick={close}
          aria-label="닫기"
          type="submit"
        >
          <XIcon width={24} height={24} />
        </button>
        <div className="flex h-[186px] w-[280px] flex-col justify-center gap-[24px] pt-[48px]">
          <div className="flex flex-col items-center justify-center gap-[24px]">
            {userImage ? (
              <div className="relative size-[52px]">
                <Image
                  src={userImage}
                  alt="프로필 이미지"
                  fill
                  sizes="52px"
                  className="rounded-full object-cover"
                />
              </div>
            ) : (
              <DefaultProfile className="h-[52px] w-[52px]" />
            )}

            <div className="flex flex-col items-center justify-center gap-[8px]">
              <div className="flex items-center gap-[4px]">
                {isAdmin && (
                  <Image src={Crown} alt="왕관" width={20} height={20} />
                )}

                <p className="text-[14px] font-[500] text-text-primary">
                  {userName}
                </p>
              </div>

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
}

export default ModalMemberProfile;
