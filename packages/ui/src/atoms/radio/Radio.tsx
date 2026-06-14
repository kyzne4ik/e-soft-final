import type { ReactNode } from "react";
import { classNames } from "../../libs/classNames";
import css from "./Radio.module.css";

export interface RadioProps {
  selected?: boolean;
  onChange?: (selected: true) => void;
  label?: ReactNode;
  disabled?: boolean;
  name?: string;
  id?: string;
}

export function Radio({
  selected = false,
  onChange,
  label,
  disabled = false,
  name,
  id,
}: RadioProps) {
  return (
    <label
      className={classNames(css.ui_radio, {
        [css.ui_radio__disabled]: disabled,
      })}
    >
      <input
        type="radio"
        id={id}
        name={name}
        className={css.ui_radio__input}
        checked={selected}
        disabled={disabled}
        onChange={() => onChange?.(true)}
      />
      <span className={css.ui_radio__circle} aria-hidden>
        <span className={css.ui_radio__dot} />
      </span>
      {label ? <span className={css.ui_radio__label}>{label}</span> : null}
    </label>
  );
}
