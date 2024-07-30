"use client";

import useClickOutside from "@/hooks/use-click-outside";
import CloseButton from "@/public/icons/x.svg";
import { cva } from "class-variance-authority";
import { createContext, useCallback, useContext, useState } from "react";

interface ModalContextType {
  handleClose: () => void;
  isModalOpen: boolean;
}

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProps {
  children: React.ReactNode;
  button: React.ReactNode;
  className?: string;
}

const modalVariants = cva([
  "z-50",
  "w-full",
  "rounded-t-xl",
  "bg-background-secondary",
  "md:w-[384px]",
  "md:rounded-b-xl",
  "px-4",
  "pb-8",
  "pt-4",
]);

// TODO : 모바일일 때 프레이머 모션 추가
// TODO : zustand로 상태관리
/**
 * 컴파운드 패턴으로 만들어진 공용 모달 컴포넌트입니다. 전역 상태로 처리되어 닫기 버튼을 HeaderWithClose에서
 * 사용할 수 있습니다. 모달을 열기 위한 버튼을 button으로 받습니다.
 * Title, Description, HeaderWithClose 컴포넌트를 내부에 사용할 수 있습니다.
 * 각 컴포넌트들은 className을 받아 추가적인 스타일을 넣을 수 있습니다.
 *
 * @author 이승현
 * @param children 모달 내부에 들어갈 컴포넌트
 * @param button 모달을 열 버튼
 * @param className 모달 컴포넌트 안에 추가적인 css를 넣습니다.
 * @returns
 * @example
 * ```tsx
 * <Modal button={<button>버튼</button>}>
        <Modal.HeaderWithClose />
        <Modal.Title>멤버 초대</Modal.Title>
        <Modal.Description className="mb-8 mt-10">
          그룹에 참여할 수 있는 링크를 복사합니다.
        </Modal.Description>
        <Button btnSize="large" btnStyle="solid" className="mx-auto w-[280px]">
          버튼
        </Button>
      </Modal>
 * ```
 */
export default function Modal({ children, button, className }: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useClickOutside<HTMLDivElement>(() => setIsModalOpen(false));

  const handleOpen = useCallback(() => setIsModalOpen(true), []);
  const handleClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <ModalContext.Provider value={{ handleClose, isModalOpen }}>
      <span onClick={handleOpen}>{button}</span>
      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 md:items-center md:justify-center">
          <div ref={modalRef} className={modalVariants({ className })}>
            {children}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

Modal.HeaderWithClose = HeaderWithClose;
Modal.Description = Description;
Modal.Title = Title;

export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
}

interface TitleProps {
  className?: string;
  children: React.ReactNode;
}

const titleVariants = cva([
  "text-base",
  "font-medium",
  "text-text-primary",
  "text-center",
]);

function Title({ className, children }: TitleProps) {
  return <h1 className={titleVariants({ className })}>{children}</h1>;
}

Title.displayName = "Modal.Header";

interface DescriptionProps {
  className?: string;
  children: React.ReactNode;
}

const descriptionVariants = cva([
  "break-keep",
  "text-sm",
  "font-medium",
  "text-text-secondary",
  "text-center",
]);

function Description({ className, children }: DescriptionProps) {
  return <h2 className={descriptionVariants({ className })}>{children}</h2>;
}

Description.displayName = "Modal.Description";

interface HeaderWithCloseProps {
  className?: string;
}

const headerWithCloseVariants = cva(["flex", "justify-end"]);

function HeaderWithClose({ className }: HeaderWithCloseProps) {
  const { handleClose } = useModal();
  return (
    <header className={headerWithCloseVariants({ className })}>
      <button onClick={handleClose}>
        <CloseButton
          className="rounded-xl duration-100 hover:scale-105"
          width={24}
          height={24}
        />
      </button>
    </header>
  );
}

HeaderWithClose.displayName = "Modal.HeaderWithClose";
