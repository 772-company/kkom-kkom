import Button from "@/components/button/button";

import { useModal } from "../modal";

interface TwoButtonSectionProps {
  buttonDescription: string;
  btnStyle1: "solid" | "outlined" | "outlined_secondary" | "danger";
  btnStyle2: "solid" | "outlined" | "outlined_secondary" | "danger";
  onClick?: () => void;
}

export function TwoButtonSection({
  buttonDescription,
  btnStyle1,
  btnStyle2,
  onClick,
}: TwoButtonSectionProps) {
  const { handleClose } = useModal();
  return (
    <section className="mb-8 mt-6 flex w-full gap-2">
      <Button
        btnSize="large"
        btnStyle={btnStyle1}
        type="button"
        className="flex-1"
        onClick={handleClose}
      >
        닫기
      </Button>
      <Button
        btnSize="large"
        btnStyle={btnStyle2}
        className="flex-1"
        onClick={onClick}
      >
        {buttonDescription}
      </Button>
    </section>
  );
}
