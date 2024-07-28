import Button from "@/components/button";

interface OneButtonSectionProps {
  buttonDescription: string;
  btnStyle: "solid" | "outlined" | "outlined_secondary" | "danger";
  onClick?: () => void;
}

export function OneButtonSection({
  buttonDescription,
  btnStyle,
  onClick,
}: OneButtonSectionProps) {
  return (
    <section className="flex w-full">
      <Button
        btnSize="large"
        btnStyle={btnStyle}
        className="mb-8 mt-6 flex-1"
        onClick={onClick}
      >
        {buttonDescription}
      </Button>
    </section>
  );
}
