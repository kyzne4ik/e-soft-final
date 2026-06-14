import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type DragEvent,
  type ReactNode,
} from "react";
import { classNames } from "../../libs/classNames";
import { Icon } from "../../atoms/icon";
import { Button } from "../../atoms/button";

import {
  formatFileSize,
  getFileKind,
  type FileTone,
} from "../file-card/fileKinds";
import {
  DropZoneContext,
  DropZoneItemContext,
  createFileId,
  useControllableState,
  useDropZone,
  useDropZoneItem,
  type DropZoneFile,
} from "./DropZoneContext";

import css from "./DropZone.module.css";

const TONE_CLASS: Record<FileTone, string> = {
  primary: css.ui_dz__tone_primary,
  info: css.ui_dz__tone_info,
  success: css.ui_dz__tone_success,
  warning: css.ui_dz__tone_warning,
  error: css.ui_dz__tone_error,
  secondary: css.ui_dz__tone_secondary,
  tertiary: css.ui_dz__tone_tertiary,
  neutral: css.ui_dz__tone_neutral,
};

export interface DropZoneProps {
  items?: DropZoneFile[];
  defaultItems?: DropZoneFile[];
  onItemsChange?: (items: DropZoneFile[]) => void;
  onFilesAdded?: (files: File[]) => void;
  onRemove?: (id: string) => void;
  onRetry?: (id: string) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

function DropZoneRoot({
  items: controlled,
  defaultItems = [],
  onItemsChange,
  onFilesAdded,
  onRemove,
  onRetry,
  accept,
  multiple = true,
  maxSize,
  disabled = false,
  className,
  children,
}: DropZoneProps) {
  const [items, setItems] = useControllableState<DropZoneFile[]>(
    controlled,
    defaultItems,
    onItemsChange,
  );
  const [isDragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const addFiles = useCallback(
    (incoming: FileList | File[] | null) => {
      const list = Array.from(incoming ?? []);
      if (!list.length) return;

      const mapped: DropZoneFile[] = list.map((file) => {
        const tooBig = maxSize != null && file.size > maxSize;
        return {
          id: createFileId(),
          name: file.name,
          size: file.size,
          status: tooBig ? "error" : "done",
          error: tooBig ? `Файл больше ${formatFileSize(maxSize)}` : undefined,
          progress: tooBig ? undefined : 100,
          file,
        };
      });

      setItems((prev) =>
        multiple ? [...prev, ...mapped] : mapped.slice(0, 1),
      );
      onFilesAdded?.(list);

      if (inputRef.current) inputRef.current.value = "";
    },
    [maxSize, multiple, onFilesAdded, setItems],
  );

  const removeFile = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      onRemove?.(id);
    },
    [onRemove, setItems],
  );

  const retryFile = useCallback(
    (id: string) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: "uploading", progress: 0, error: undefined }
            : item,
        ),
      );
      onRetry?.(id);
    },
    [onRetry, setItems],
  );

  const value = useMemo(
    () => ({
      items,
      isDragging,
      disabled,
      accept,
      multiple,
      inputRef,
      openFileDialog,
      addFiles,
      removeFile,
      retryFile,
      setDragging,
    }),
    [
      items,
      isDragging,
      disabled,
      accept,
      multiple,
      openFileDialog,
      addFiles,
      removeFile,
      retryFile,
    ],
  );

  return (
    <DropZoneContext.Provider value={value}>
      <div className={classNames(css.ui_dz, {}, [className])}>{children}</div>
    </DropZoneContext.Provider>
  );
}

export interface AreaProps {
  children: ReactNode;
  className?: string;
}

function Area({ children, className }: AreaProps) {
  const { isDragging, setDragging, disabled, openFileDialog, addFiles } =
    useDropZone();

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled) setDragging(true);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (!disabled) addFiles(event.dataTransfer.files);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFileDialog();
    }
  };

  return (
    <div
      className={classNames(
        css.ui_dz__area,
        {
          [css.ui_dz__area_dragging]: isDragging,
          [css.ui_dz__area_disabled]: disabled,
        },
        [className],
      )}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={() => openFileDialog()}
      onKeyDown={handleKeyDown}
      onDragOver={handleDragOver}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
}

export interface AreaIconProps {
  name?: string;
  size?: number;
  className?: string;
}

function AreaIcon({
  name = "cloud-upload",
  size = 26,
  className,
}: AreaIconProps) {
  return (
    <div className={classNames(css.ui_dz__area_icon, {}, [className])}>
      <Icon name={name} size={size} />
    </div>
  );
}

export interface TextProps {
  children: ReactNode;
  className?: string;
}

function Label({ children, className }: TextProps) {
  return (
    <div className={classNames(css.ui_dz__label, {}, [className])}>
      {children}
    </div>
  );
}

function Description({ children, className }: TextProps) {
  return (
    <div className={classNames(css.ui_dz__description, {}, [className])}>
      {children}
    </div>
  );
}

export interface TriggerProps {
  children?: ReactNode;
  className?: string;
}

function Trigger({ children = "Выбрать файлы", className }: TriggerProps) {
  const { openFileDialog, disabled } = useDropZone();
  return (
    <Button
      variant="secondary"
      size="sm"
      isDisabled={disabled}
      className={className}
      onClick={(event) => {
        event.stopPropagation();
        openFileDialog();
      }}
    >
      {children}
    </Button>
  );
}

function Input({ className }: { className?: string }) {
  const { inputRef, accept, multiple, disabled, addFiles } = useDropZone();
  return (
    <input
      ref={inputRef}
      type="file"
      accept={accept}
      multiple={multiple}
      disabled={disabled}
      hidden
      className={className}
      onChange={(event) => addFiles(event.target.files)}
    />
  );
}

export interface FileListProps {
  children?: ReactNode;
  className?: string;
}

function FileList({ children, className }: FileListProps) {
  const { items } = useDropZone();
  if (!items.length) return null;

  return (
    <div className={classNames(css.ui_dz__list, {}, [className])}>
      {items.map((item) => (
        <DropZoneItemContext.Provider key={item.id} value={item}>
          {children ?? <DefaultFileItem />}
        </DropZoneItemContext.Provider>
      ))}
    </div>
  );
}

function DefaultFileItem() {
  return (
    <FileItem>
      <FileFormatIcon />
      <FileInfo>
        <FileName />
        <FileMeta />
      </FileInfo>
      <FileProgress>
        <FileProgressTrack>
          <FileProgressFill />
        </FileProgressTrack>
      </FileProgress>
      <FileRetryTrigger />
      <FileRemoveTrigger />
    </FileItem>
  );
}

export interface FileChildrenProps {
  children?: ReactNode;
  className?: string;
}

function FileItem({ children, className }: FileChildrenProps) {
  const item = useDropZoneItem();
  return (
    <div
      className={classNames(
        css.ui_dz__item,
        { [css.ui_dz__item_error]: item?.status === "error" },
        [className],
      )}
    >
      {children}
    </div>
  );
}

function FileFormatIcon({ className }: { className?: string }) {
  const item = useDropZoneItem();
  const kind = getFileKind(item?.name ?? "");
  return (
    <div
      className={classNames(css.ui_dz__file_icon, {}, [
        TONE_CLASS[kind.tone],
        className,
      ])}
    >
      <Icon name={kind.icon} size={20} />
    </div>
  );
}

function FileInfo({ children, className }: FileChildrenProps) {
  return (
    <div className={classNames(css.ui_dz__info, {}, [className])}>
      {children}
    </div>
  );
}

function FileName({ children, className }: FileChildrenProps) {
  const item = useDropZoneItem();
  const content = item?.name ?? children;
  return (
    <span
      className={classNames(css.ui_dz__name, {}, [className])}
      title={typeof content === "string" ? content : undefined}
    >
      {content}
    </span>
  );
}

function FileMeta({ children, className }: FileChildrenProps) {
  const item = useDropZoneItem();
  const isError = item?.status === "error";
  const content = item
    ? isError
      ? (item.error ?? "Ошибка загрузки")
      : formatFileSize(item.size)
    : children;

  return (
    <span
      className={classNames(
        css.ui_dz__meta,
        { [css.ui_dz__meta_error]: isError },
        [className],
      )}
    >
      {content}
    </span>
  );
}

function FileProgress({ children, className }: FileChildrenProps) {
  const item = useDropZoneItem();
  if (item && item.status !== "uploading") return null;
  return (
    <div className={classNames(css.ui_dz__progress, {}, [className])}>
      {children}
    </div>
  );
}

function FileProgressTrack({ children, className }: FileChildrenProps) {
  return (
    <div className={classNames(css.ui_dz__track, {}, [className])}>
      {children}
    </div>
  );
}

function FileProgressFill({ className }: { className?: string }) {
  const item = useDropZoneItem();
  const width = Math.min(100, Math.max(0, item?.progress ?? 0));
  return (
    <div
      className={classNames(css.ui_dz__fill, {}, [className])}
      style={{ width: `${width}%` }}
    />
  );
}

function FileRetryTrigger({ className }: { className?: string }) {
  const { retryFile } = useDropZone();
  const item = useDropZoneItem();
  if (!item || item.status !== "error") return null;
  return (
    <Button
      isIconOnly
      variant="ghost"
      size="sm"
      aria-label="Повторить загрузку"
      className={className}
      onClick={() => retryFile(item.id)}
    >
      <Icon name="refresh-cw" size={16} />
    </Button>
  );
}

function FileRemoveTrigger({ className }: { className?: string }) {
  const { removeFile } = useDropZone();
  const item = useDropZoneItem();
  if (!item) return null;
  return (
    <Button
      isIconOnly
      variant="ghost"
      size="sm"
      aria-label="Удалить файл"
      className={className}
      onClick={() => removeFile(item.id)}
    >
      <Icon name="x" size={16} />
    </Button>
  );
}

export const DropZone = Object.assign(DropZoneRoot, {
  Area,
  Icon: AreaIcon,
  Label,
  Description,
  Trigger,
  Input,
  FileList,
  FileItem,
  FileFormatIcon,
  FileInfo,
  FileName,
  FileMeta,
  FileProgress,
  FileProgressTrack,
  FileProgressFill,
  FileRetryTrigger,
  FileRemoveTrigger,
});
