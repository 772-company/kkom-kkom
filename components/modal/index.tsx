"use client";

import useClickOutside from "@/hooks/use-click-outside";
import { createContext, useCallback, useContext, useState } from "react";

interface ModalContextType {
  handleClose: () => void;
  isModalOpen: boolean;
}

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProps {
  children: React.ReactNode;
  button: React.ReactNode;
}

// TODO : 모바일일 때 프레이머 모션 추가
// TODO : zustand로 상태관리
/**
 * 전역 상태를 활용해서 모달을 관리하는 컴포넌트
 *
 * @author 이승현
 * @param children 모달 내부에 들어갈 컴포넌트
 * @param button 모달을 열 버튼
 * @returns
 * @example
 * ```tsx
 * <Modal button={<button>버튼</button>}>
 * <PopupOneButton
 *  description="그룹에 참여할 수 있는 링크를 복사합니다."
 * title="멤버 초대"
 * handleConfirm={() => console.log("복사")}
 * buttonDescription="복사하기"
 * />
 * </Modal>
 * ```
 */
export default function Modal({ children, button }: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useClickOutside<HTMLDivElement>(() => setIsModalOpen(false));

  const handleOpen = useCallback(() => setIsModalOpen(true), []);
  const handleClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <ModalContext.Provider value={{ handleClose, isModalOpen }}>
      <section>
        <div onClick={handleOpen}>{button}</div>
      </section>
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 md:items-center md:justify-center">
          <div
            ref={modalRef}
            className="z-50 w-full rounded-t-xl bg-background-secondary md:w-[384px] md:rounded-b-xl"
          >
            {children}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}
