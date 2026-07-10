import { type ReactNode, useState } from "react";
import { Icon } from "../../atoms/icon";
import { Button } from "../../atoms/button";
import css from "./CopyField.module.css";

export interface CopyFieldProps {
  value: string;
  label?: ReactNode;
}

export function CopyField({ value, label }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={css.ui_copy_field}>
      {label ? <span className={css.ui_copy_field__label}>{label}</span> : null}

      <div className={css.ui_copy_field__row}>
        <input
          className={css.ui_copy_field__input}
          value={value}
          readOnly
          onFocus={(event) => event.currentTarget.select()}
        />
        <Button
          isIconOnly
          variant="secondary"
          aria-label="Скопировать"
          onClick={handleCopy}
        >
          <Icon name={copied ? "check" : "copy"} size={16} />
        </Button>
      </div>
    </div>
  );
}
