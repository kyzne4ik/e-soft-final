import css from "./Modal.module.css";
import { Icon } from "../../atoms/icon";
import { Text } from "../../atoms/text";
import { classNames } from "../../libs/classNames";
import { useOverlay } from "../../hooks/use-overlay";
import { type ReactNode } from "react";
import { withPortal } from "../../hocs/with-portal";

export type ModalSize = "sm" | "default" | "wide";

export interface ModalProps {
  title?: ReactNode;
  sub?: ReactNode;
  onClose: () => void;
  children: ReactNode;
  isOpen: boolean;
  size?: ModalSize;
}

function BaseModal({
  title,
  sub,
  onClose,
  children,
  isOpen,
  size = "default",
}: ModalProps) {
  const { ref, isMounted, isClosing, onAnimationEnd } = useOverlay(
    isOpen,
    onClose,
  );

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

export const Modal = (props: ModalProps) => withPortal(BaseModal)(props);

Modal.Header = function ModalHeader({ children }: { children: ReactNode }) {
  return <div className={css.ui_modal__header}>{children}</div>;
};

Modal.Body = function ModalBody({ children }: { children: ReactNode }) {
  return <div className={css.ui_modal__body}>{children}</div>;
};

Modal.Footer = function ModalFooter({ children }: { children: ReactNode }) {
  return <div className={css.ui_modal__foot}>{children}</div>;
};
