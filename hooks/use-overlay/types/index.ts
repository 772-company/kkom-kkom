export type CreateOverlayElement = (props: {
  isOpen: boolean;
  close: () => void;
}) => JSX.Element;
