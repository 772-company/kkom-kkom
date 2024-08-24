import Modal from "@/components/modal/modal";
import Image from "next/image";

export default function ModalDelete({
  close,
  onDelete,
}: {
  close: () => void;
  onDelete: () => void;
}) {
  const handleClick = () => {
    onDelete();
    close();
  };
  return (
    <Modal close={close} closeOnFocusOut>
      <header className="flex justify-center pb-4 pt-6">
        <Image src="/icons/alert.svg" alt="" width={24} height={24} />
      </header>
      <div className="mx-12 text-center md:mx-9">
        <Modal.Title className="mb-4 text-slate-50 md:text-text-primary">
          삭제하시겠습니까?
        </Modal.Title>
        <Modal.Description className="mb-6">
          삭제한 데이터는 복구할 수 없습니다.
        </Modal.Description>
        <Modal.TwoButtonSection
          closeBtnStyle="outlined_secondary"
          confirmBtnStyle="danger"
          buttonDescription="삭제하기"
          onClick={handleClick}
          close={close}
        />
      </div>
    </Modal>
  );
}
