export interface ModalComponentHandle {
  open: () => void;
  close: () => void;
}

export interface ModalComponentProps {
  title?: string;
  showCloseIcon?: boolean;
  footer?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  fullscreen?: boolean;
  onClose?: () => void;
}
