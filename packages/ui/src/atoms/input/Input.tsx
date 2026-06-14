import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { classNames } from "../../libs/classNames";
import css from "./Input.module.css";

export type InputState = "default" | "error";
export type InputVariant = "outline" | "filled" | "flushed";

const VARIANT_CLASS: Record<InputVariant, string | undefined> = {
  outline: undefined,
  filled: css.ui_input__field__filled,
  flushed: css.ui_input__field__flushed,
};

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: ReactNode;
  state?: InputState;
  errorMessage?: string;
  variant?: InputVariant;
  fullWidth?: boolean;
}

export function Input({
  label,
  state = "default",
  errorMessage,
  variant = "outline",
  fullWidth = false,
  className,
  id,
  disabled,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isError = state === "error";

  return (
    <div
      className={classNames(css.ui_input, { [css.ui_input__full]: fullWidth }, [
        className,
      ])}
    >
      {label ? (
        <label
          htmlFor={inputId}
          className={classNames(css.ui_input__label, {
            [css.ui_input__label__disabled]: disabled,
          })}
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={classNames(
          css.ui_input__field,
          {
            [css.ui_input__field__error]: isError,
            [css.ui_input__field__full]: fullWidth,
          },
          [VARIANT_CLASS[variant]],
        )}
        disabled={disabled}
        aria-invalid={isError || undefined}
        {...rest}
      />
      {isError && errorMessage ? (
        <span className={css.ui_input__error} role="alert">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}
