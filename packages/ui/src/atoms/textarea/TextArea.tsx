import { useId, type TextareaHTMLAttributes, type ReactNode } from "react";
import { classNames } from "../../libs/classNames";
import css from "./TextArea.module.css";

export type TextAreaState = "default" | "error";
export type TextAreaResize = "none" | "vertical" | "horizontal" | "both";
export type TextAreaVariant = "outline" | "filled" | "flushed";

const RESIZE_CLASS: Record<TextAreaResize, string> = {
  none: css.ui_textarea__field__resize_none,
  vertical: css.ui_textarea__field__resize_vertical,
  horizontal: css.ui_textarea__field__resize_horizontal,
  both: css.ui_textarea__field__resize_both,
};

const VARIANT_CLASS: Record<TextAreaVariant, string | undefined> = {
  outline: undefined,
  filled: css.ui_textarea__field__filled,
  flushed: css.ui_textarea__field__flushed,
};

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  state?: TextAreaState;
  errorMessage?: string;
  resize?: TextAreaResize;
  variant?: TextAreaVariant;
  fullWidth?: boolean;
}

export function TextArea({
  label,
  state = "default",
  errorMessage,
  resize = "vertical",
  variant = "outline",
  fullWidth = false,
  rows = 4,
  className,
  id,
  disabled,
  required,
  ...rest
}: TextAreaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const isError = state === "error";

  return (
    <div
      className={classNames(
        css.ui_textarea,
        { [css.ui_textarea__full]: fullWidth },
        [className],
      )}
    >
      {label ? (
        <label
          htmlFor={textareaId}
          className={classNames(css.ui_textarea__label, {
            [css.ui_textarea__label__disabled]: disabled,
          })}
        >
          {label}
          {required ? (
            <span
              className={css.ui_textarea__required}
              aria-hidden
              title="Обязательное поле"
            >
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <textarea
        id={textareaId}
        rows={rows}
        className={classNames(
          css.ui_textarea__field,
          {
            [css.ui_textarea__field__error]: isError,
            [css.ui_textarea__field__full]: fullWidth,
          },
          [RESIZE_CLASS[resize], VARIANT_CLASS[variant]],
        )}
        disabled={disabled}
        aria-required={required || undefined}
        aria-invalid={isError || undefined}
        {...rest}
      />
      {isError && errorMessage ? (
        <span className={css.ui_textarea__error} role="alert">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}
