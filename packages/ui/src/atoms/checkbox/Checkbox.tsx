import { useEffect, useRef, type ReactNode } from "react";
import { classNames } from "../../libs/classNames";
import css from "./Checkbox.module.css";

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: ReactNode;
  disabled?: boolean;
  id?: string;
  name?: string;
}

const CheckMark = () => (
  <svg width={12} height={12} viewBox="0 0 12 12" fill="none" aria-hidden>
    <path
      d="M2.5 6L5 8.5L9.5 3.5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DashMark = () => (
  <svg width={12} height={12} viewBox="0 0 12 12" fill="none" aria-hidden>
    <rect x={2} y={5} width={8} height={2} rx={1} fill="currentColor" />
  </svg>
);

export function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  disabled = false,
  id,
  name,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      className={classNames(css.ui_check, {
        [css.ui_check__disabled]: disabled,
      })}
    >
      <input
        ref={inputRef}
        type="checkbox"
        id={id}
        name={name}
        className={css.ui_check__input}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span className={css.ui_check__box} aria-hidden>
        {indeterminate ? <DashMark /> : checked ? <CheckMark /> : null}
      </span>
      {label ? <span className={css.ui_check__label}>{label}</span> : null}
    </label>
  );
}
