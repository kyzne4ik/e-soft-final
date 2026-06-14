import { useRef, useState } from "react";
import css from "./Button.module.css";
import { classNames } from "../../libs/classNames";
import { Spinner } from "../spinner";
import type { ButtonHTMLAttributes, PointerEvent, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "disabled"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isDisabled?: boolean;
  isPending?: boolean;
  isIconOnly?: boolean;
  disableRipple?: boolean;
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
}

interface Ripple {
  key: number;
  x: number;
  y: number;
  size: number;
}

const SPINNER_SIZE: Record<ButtonSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
};

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isDisabled = false,
  isPending = false,
  isIconOnly = false,
  disableRipple = false,
  type = "button",
  className,
  children,
  onPointerDown,
  ...rest
}: ButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleKey = useRef(0);

  const disabled = isDisabled || isPending;

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (!disableRipple && !disabled) {
      const rect = event.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      setRipples((prev) => [
        ...prev,
        {
          key: rippleKey.current++,
          size,
          x: event.clientX - rect.left - size / 2,
          y: event.clientY - rect.top - size / 2,
        },
      ]);
    }
    onPointerDown?.(event);
  };

  const removeRipple = (key: number) =>
    setRipples((prev) => prev.filter((ripple) => ripple.key !== key));

  return (
    <button
      type={type}
      disabled={disabled}
      aria-busy={isPending}
      onPointerDown={handlePointerDown}
      className={classNames(
        css.ui_btn,
        {
          [css.ui_btn__full]: fullWidth,
          [css.ui_btn__icon_only]: isIconOnly,
          [css.ui_btn__pending]: isPending,
        },
        [css[`ui_btn__${variant}`], css[`ui_btn__${size}`], className],
      )}
      {...rest}
    >
      {isPending ? (
        <span className={css.ui_btn__spinner}>
          <Spinner color="current" size={SPINNER_SIZE[size]} />
        </span>
      ) : null}
      <span className={css.ui_btn__content}>{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          className={css.ui_btn__ripple}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          onAnimationEnd={() => removeRipple(ripple.key)}
        />
      ))}
    </button>
  );
}
