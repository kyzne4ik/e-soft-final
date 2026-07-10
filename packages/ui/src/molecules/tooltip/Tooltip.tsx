import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { classNames } from "../../libs/classNames";
import css from "./Tooltip.module.css";
import { withPortal } from "../../hocs/with-portal";

export type TooltipPosition =
  "top" | "bottom" | "left" | "right" | "bottom_right" | "top_right";

const GAP = 8;

export interface TooltipProps {
  children: ReactNode;
  text: ReactNode;
  position?: TooltipPosition;
  className?: string;
  style?: CSSProperties;
  contentClassName?: string;
}

const TooltipBubble = withPortal(function Bubble({
  text,
  style,
  className,
}: {
  text: ReactNode;
  style: CSSProperties;
  className?: string;
}) {
  return (
    <span
      className={classNames(css.ui_tooltip__bubble, {}, [className])}
      role="tooltip"
      style={style}
    >
      {text}
    </span>
  );
});

function computeStyle(rect: DOMRect, position: TooltipPosition): CSSProperties {
  switch (position) {
    case "bottom":
      return {
        top: rect.bottom + GAP,
        left: rect.left + rect.width / 2,
        transform: "translateX(-50%)",
      };
    case "bottom_right":
      return {
        top: rect.bottom + GAP,
        left: rect.right,
        transform: "translateX(-100%)",
      };
    case "top_right":
      return {
        top: rect.top - GAP,
        left: rect.right,
        transform: "translate(-100%, -100%)",
      };
    case "left":
      return {
        top: rect.top + rect.height / 2,
        left: rect.left - GAP,
        transform: "translate(-100%, -50%)",
      };
    case "right":
      return {
        top: rect.top + rect.height / 2,
        left: rect.right + GAP,
        transform: "translateY(-50%)",
      };
    case "top":
    default:
      return {
        top: rect.top - GAP,
        left: rect.left + rect.width / 2,
        transform: "translate(-50%, -100%)",
      };
  }
}

export function Tooltip({
  children,
  text,
  position = "top",
  className,
  style: wrapperStyle,
  contentClassName,
}: TooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [style, setStyle] = useState<CSSProperties | null>(null);

  const open = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    setStyle(computeStyle(el.getBoundingClientRect(), position));
  }, [position]);

  const close = useCallback(() => setStyle(null), []);

  const isOpen = style !== null;

  useLayoutEffect(() => {
    if (!isOpen) return;
    window.addEventListener("scroll", open, true);
    window.addEventListener("resize", open);
    return () => {
      window.removeEventListener("scroll", open, true);
      window.removeEventListener("resize", open);
    };
  }, [isOpen, open]);

  return (
    <span
      ref={triggerRef}
      className={classNames(css.ui_tooltip, {}, [className])}
      style={wrapperStyle}
      onMouseEnter={open}
      onMouseLeave={close}
      onFocus={open}
      onBlur={close}
    >
      {children}
      {style && (
        <TooltipBubble text={text} style={style} className={contentClassName} />
      )}
    </span>
  );
}
