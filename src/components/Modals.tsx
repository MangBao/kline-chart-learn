import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useEffect,
} from "react";
import type { ModalComponentHandle, ModalComponentProps } from "@/types";

const ModalComponent = forwardRef<ModalComponentHandle, ModalComponentProps>(
  (
    {
      title,
      showCloseIcon = true,
      footer,
      className = "",
      children,
      fullscreen = false,
      onClose,
    },
    ref
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      open: () => {
        dialogRef.current?.showModal();
      },
      close: () => {
        dialogRef.current?.close();
        onClose?.();
      },
    }));

    // Close modal on backdrop click
    const handleBackdropClick = useCallback(
      (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) {
          dialogRef.current?.close();
        }
      },
      []
    );

    // Trigger onClose callback when dialog closes
    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog || !onClose) return;

      const handleNativeClose = () => {
        onClose();
      };

      dialog.addEventListener("close", handleNativeClose);
      return () => {
        dialog.removeEventListener("close", handleNativeClose);
      };
    }, [onClose]);

    return (
      <dialog
        ref={dialogRef}
        className={`modal ${fullscreen ? "modal-bottom sm:modal-middle" : ""}`}
        onClick={handleBackdropClick}
      >
        <div
          className={`modal-box transition-all duration-300 ${
            fullscreen ? "w-full h-full max-w-none" : ""
          } ${className}`}
        >
          {(title || showCloseIcon) && (
            <div className="flex justify-between items-center mb-4">
              {title && <h3 className="text-lg font-bold">{title}</h3>}
              {showCloseIcon && (
                <button
                  className="btn btn-sm btn-circle btn-ghost"
                  onClick={() => dialogRef.current?.close()}
                >
                  ✕
                </button>
              )}
            </div>
          )}
          <div className="overflow-y-auto max-h-[75vh]">{children}</div>
          {footer && <div className="modal-action">{footer}</div>}
        </div>
      </dialog>
    );
  }
);

export default ModalComponent;
