import { useId, type SelectHTMLAttributes, type ReactNode } from "react";

import { classNames } from "../../libs/classNames";
import { Icon } from "../icon";

import css from "./Select.module.css";

export type SelectState = "default" | "error";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  label?: ReactNode;
  state?: SelectState;
  errorMessage?: string;
  placeholder?: string;
  options?: SelectOption[];
}

export function Select({
  label,
  state = "default",
  errorMessage,
  placeholder,
  options,
  className,
  id,
  disabled,
  value,
  defaultValue,
  children,
  ...rest
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const isError = state === "error";

  const placeholderSelected =
    value === "" || (value === undefined && defaultValue === undefined);

  return (
    <div className={classNames(css.ui_select, {}, [className])}>
      {label ? (
        <label
          htmlFor={selectId}
          className={classNames(css.ui_select__label, {
            [css.ui_select__label__disabled]: disabled,
          })}
        >
          {label}
        </label>
      ) : null}

      <div className={css.ui_select__wrap}>
        <select
          id={selectId}
          className={classNames(
            css.ui_select__field,
            {
              [css.ui_select__field__error]: isError,
              [css.ui_select__field__placeholder]:
                Boolean(placeholder) && placeholderSelected,
            },
            [],
          )}
          disabled={disabled}
          aria-invalid={isError || undefined}
          value={value}
          defaultValue={defaultValue}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          ) : null}
          {options
            ? options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </option>
              ))
            : children}
        </select>
        <Icon
          name="chevron-down"
          size={18}
          className={css.ui_select__chevron}
        />
      </div>

      {isError && errorMessage ? (
        <span className={css.ui_select__error} role="alert">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}
