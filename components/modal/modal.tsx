"use client";

import Button from "@/components/button/button";
import useClickOutside from "@/hooks/use-click-outside";
import { cn } from "@/lib/cn";
import CloseButton from "@/public/icons/x.svg";
import { motion } from "framer-motion";
import { LegacyRef, createContext, useContext } from "react";

import {
  descriptionVariants,
  headerWithCloseVariants,
  modalVariants,
  overlayVariants,
  titleVariants,
  twoButtonVariants,
} from "./variants";

interface ModalContextType {
  close: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

interface ModalProps {
  closeOnFocusOut: boolean;
  close: () => void;
  children: React.ReactNode;
}

Modal.Title = Title;
Modal.HeaderWithClose = HeaderWithClose;
Modal.Description = Description;
Modal.TwoButtonSection = TwoButtonSection;

/**
 * 모달 컴포넌트
 *
 * @description 컴파운드 패턴으로 만들어졌으며 useCustomOverlay의 인수로써 함께 사용하시면 됩니다.
 * 각 요소들은 margin이 정해져 있지 않습니다. className으로 지정해서 조합해서 사용하시면 됩니다.
 *
 * @author 이승현
 * @param close 모달을 끄는 함수
 * @param children 모달 내부
 * @param closeOnFocusOut 화면 밖 클릭시 모달을 끄는 여부
 * @example
 * ```tsx
  export function ModalWarning({ handleConfirm, close }: ModalWarningProps) {
    const handleClick = async () => {
      await handleConfirm();
      close();
    };
    return (
      <Modal close={close} closeOnFocusOut>
        <header className="flex justify-center pb-4 pt-6">
          <Alert width={24} height={24} />
        </header>
        <div className="mx-12 text-center md:mx-9">
          <Modal.Title className="mb-2 text-slate-50 md:text-text-primary">
            회원 탈퇴를 진행하시겠어요?
          </Modal.Title>
          <Modal.Description className="mb-4">
            그룹장에 있는 모든 그룹은 삭제되고, 모든 그룹에서 나가집니다.
          </Modal.Description>
          <Modal.TwoButtonSection
            closeBtnStyle="outlined_secondary"
            confirmBtnStyle="danger"
            buttonDescription="회원 탈퇴"
            onClick={handleClick}
            close={close}
          />
        </div>
      </Modal>
    );
  }
```
 */
export default function Modal({
  children,
  close,
  closeOnFocusOut,
}: ModalProps) {
  const modalRef = useClickOutside(() => {
    close();
  });

  return (
    <>
      <ModalContext.Provider value={{ close }}>
        <section className={cn(overlayVariants())}>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.1 }}
            className={cn(modalVariants())}
            ref={
              closeOnFocusOut
                ? (modalRef as LegacyRef<HTMLDivElement> | undefined)
                : null
            }
          >
            {children}
          </motion.div>
        </section>
      </ModalContext.Provider>
    </>
  );
}

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

function Title({ className, children }: TitleProps) {
  return <h1 className={titleVariants({ className })}>{children}</h1>;
}

Title.displayName = "Modal.Title";

interface DescriptionProps {
  className?: string;
  children: React.ReactNode;
}

function Description({ className, children }: DescriptionProps) {
  return <h2 className={descriptionVariants({ className })}>{children}</h2>;
}

Description.displayName = "Modal.Description";

interface HeaderWithCloseProps {
  className?: string;
}

function HeaderWithClose({ className }: HeaderWithCloseProps) {
  const { close } = useModal();
  return (
    <header className={headerWithCloseVariants({ className })}>
      <button onClick={close}>
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

interface TwoButtonSectionProps {
  buttonDescription: string;
  close: () => void;
  closeBtnStyle: "solid" | "outlined" | "outlined_secondary" | "danger";
  confirmBtnStyle: "solid" | "outlined" | "outlined_secondary" | "danger";
  onClick?: () => void;
  className?: string;
  confirmBtnDisabled?: boolean;
}

function TwoButtonSection({
  buttonDescription,
  close,
  closeBtnStyle,
  confirmBtnStyle,
  onClick,
  className,
  confirmBtnDisabled,
}: TwoButtonSectionProps) {
  return (
    <section className={cn(twoButtonVariants({ className }))}>
      <Button
        btnSize="large"
        btnStyle={closeBtnStyle}
        type="button"
        className="flex-1"
        onClick={close}
      >
        닫기
      </Button>
      <Button
        btnSize="large"
        btnStyle={confirmBtnStyle}
        className="flex-1"
        onClick={onClick}
        disabled={confirmBtnDisabled}
      >
        {buttonDescription}
      </Button>
    </section>
  );
}

TwoButtonSection.displayName = "Modal.TwoButtonSection";
