import { classNames } from "../../libs/classNames";
import { Icon } from "../../atoms/icon";
import { Button } from "../../atoms/button";
import { ProgressBar } from "../../atoms/progress-bar";
import {
  formatFileSize,
  getExtension,
  getFileKind,
  type FileTone,
} from "./fileKinds";

import css from "./FileCard.module.css";

const TONE_CLASS: Record<FileTone, string> = {
  primary: css.ui_file__primary,
  info: css.ui_file__info,
  success: css.ui_file__success,
  warning: css.ui_file__warning,
  error: css.ui_file__error,
  secondary: css.ui_file__secondary,
  tertiary: css.ui_file__tertiary,
  neutral: css.ui_file__neutral,
};

export type FileCardStatus = "idle" | "uploading" | "done" | "error";

export interface FileCardProps {
  name: string;
  size?: number;
  progress?: number;
  status?: FileCardStatus;
  errorText?: string;
  onRemove?: () => void;
  className?: string;
}

export function FileCard({
  name,
  size,
  progress,
  status = "idle",
  errorText,
  onRemove,
  className,
}: FileCardProps) {
  const kind = getFileKind(name);
  const ext = getExtension(name).toUpperCase() || kind.label;

  const isUploading = status === "uploading";
  const isError = status === "error";

  return (
    <div
      className={classNames(
        css.ui_file,
        { [css.ui_file__row_error]: isError },
        [className],
      )}
    >
      <div
        className={classNames(css.ui_file__icon, {}, [TONE_CLASS[kind.tone]])}
      >
        <Icon name={kind.icon} size={22} />
      </div>

      <div className={css.ui_file__body}>
        <span className={css.ui_file__name} title={name}>
          {name}
        </span>

        {isError ? (
          <span className={css.ui_file__error_text}>
            {errorText ?? "Не удалось загрузить"}
          </span>
        ) : isUploading && typeof progress === "number" ? (
          <div className={css.ui_file__progress}>
            <ProgressBar value={progress} />
            <span className={css.ui_file__meta}>{Math.round(progress)}%</span>
          </div>
        ) : (
          <span className={css.ui_file__meta}>
            {ext}
            {typeof size === "number" ? ` · ${formatFileSize(size)}` : ""}
          </span>
        )}
      </div>

      {status === "done" ? (
        <span className={css.ui_file__check}>
          <Icon name="check" size={16} />
        </span>
      ) : null}

      {onRemove ? (
        <Button
          isIconOnly
          variant="ghost"
          size="sm"
          aria-label={`Удалить ${name}`}
          onClick={onRemove}
        >
          <Icon name="x" size={16} />
        </Button>
      ) : null}
    </div>
  );
}
