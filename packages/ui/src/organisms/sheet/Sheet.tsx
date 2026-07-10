import css from "./Sheet.module.css";
import { Icon } from "../../atoms/icon";
import { classNames } from "../../libs/classNames";
import { useOverlay } from "../../hooks/use-overlay";
import { withPortal } from "../../hocs/with-portal";
import { type CSSProperties, type ReactNode } from "react";

export type SheetSide = "right" | "left";

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: SheetSide;
  className?: string;
  style?: CSSProperties;
}

function BaseSheet({
  isOpen,
  onClose,
  children,
  side = "right",
  className,
  style,
}: SheetProps) {
  const { ref, isMounted, isClosing, onAnimationEnd } =
    useOverlay<HTMLDivElement>(isOpen, onClose);

  if (!isMounted) return null;

  return (
    <div
      className={classNames(css.overlay, { [css.overlay__closing]: isClosing })}
      ref={ref}
    >
      <div
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={classNames(
          css.content,
          { [css.content__closing]: isClosing },
          [css[`content__${side}`], className],
        )}
        style={style}
        onAnimationEnd={onAnimationEnd}
      >
        {children}
      </div>
    </div>
  );
}

export const Sheet = (props: SheetProps) => withPortal(BaseSheet)(props);

Sheet.Header = function SheetHeader({
  children,
  onClose,
  className,
  style,
}: {
  children: ReactNode;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={classNames(css.header, {}, [className])} style={style}>
      <div className={css.header_slot}>{children}</div>
      {onClose && (
        <button
          type="button"
          className={css.close}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
};

Sheet.Body = function SheetBody({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={classNames(css.body, {}, [className])} style={style}>
      {children}
    </div>
  );
};

Sheet.Footer = function SheetFooter({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={classNames(css.footer, {}, [className])} style={style}>
      {children}
    </div>
  );
};
