import css from "./Modal.module.css";
import { Icon } from "../../atoms/icon";
import { Text } from "../../atoms/text";
import { classNames } from "../../libs/classNames";
import { useClickOutside } from "../../hooks/use-click-outside";
import { useEventListener } from "../../hooks/use-event-listener";
import { type ReactNode, useEffect, useRef, useState } from "react";

export type ModalSize = "sm" | "default" | "wide";

export interface ModalProps {
  title?: ReactNode;
  sub?: ReactNode;
  onClose: () => void;
  children: ReactNode;
  isOpen?: boolean;
  size?: ModalSize;
}

export function Modal({
  title,
  sub,
  onClose,
  children,
  isOpen = false,
  size = "default",
}: ModalProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
    }
  }, [isOpen]);

  const onKeyDown = (event: Event) => {
    const e = event as KeyboardEvent;
    if (e.key === "Escape" && isOpen) onClose();
  };

  const onAnimationEnd = () => {
    if (isClosing) setIsMounted(false);
  };

  useClickOutside(ref, onClose);
  useEventListener("keydown", window, onKeyDown);

  if (!isMounted) return null;

  return (
    <div
      ref={ref}
      className={classNames(css.ui_overlay, {
        [css.ui_overlay__closing]: isClosing,
      })}
    >
      <div
        className={classNames(
          css.ui_modal,
          { [css.ui_modal__closing]: isClosing },
          [size !== "default" ? css[`ui_modal__${size}`] : undefined],
        )}
        role="dialog"
        aria-modal="true"
        onAnimationEnd={onAnimationEnd}
      >
        <div className={css.ui_modal__head}>
          {(title || sub) && (
            <div className={css.ui_modal__title}>
              {title && <Text.H2>{title}</Text.H2>}
              {sub && <Text.P2>{sub}</Text.P2>}
            </div>
          )}
          <Icon
            name="x"
            size={14}
            type="button"
            className={css.ui_modal__close}
            onClick={onClose}
            aria-label="Закрыть"
          />
        </div>
        {children}
      </div>
    </div>
  );
}

Modal.Header = function ModalHeader({ children }: { children: ReactNode }) {
  return <div className={css.ui_modal__header}>{children}</div>;
};

Modal.Body = function ModalBody({ children }: { children: ReactNode }) {
  return <div className={css.ui_modal__body}>{children}</div>;
};

Modal.Footer = function ModalFooter({ children }: { children: ReactNode }) {
  return <div className={css.ui_modal__foot}>{children}</div>;
};
