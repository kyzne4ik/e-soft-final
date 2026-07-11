import { useCallback, useState, type RefObject } from "react";
import { createStrictContext, useStrictContext } from "../../libs/react/react";

export type DropZoneFileStatus = "pending" | "uploading" | "done" | "error";

export interface DropZoneFile {
  id: string;
  name: string;
  size: number;
  progress?: number;
  status: DropZoneFileStatus;
  error?: string;
  file?: File;
}

export interface DropZoneContextValue {
  items: DropZoneFile[];
  isDragging: boolean;
  disabled: boolean;
  accept?: string;
  multiple: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  openFileDialog: () => void;
  addFiles: (files: FileList | File[] | null) => void;
  removeFile: (id: string) => void;
  retryFile: (id: string) => void;
  setDragging: (value: boolean) => void;
}

export const DropZoneContext = createStrictContext<DropZoneContextValue>();

export const useDropZone = (): DropZoneContextValue =>
  useStrictContext(DropZoneContext);

export const DropZoneItemContext = createStrictContext<DropZoneFile>();

export const useDropZoneItem = (): DropZoneFile | null => {
  try {
    return useStrictContext(DropZoneItemContext);
  } catch {
    return null;
  }
};

export function useControllableState<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (updater: T | ((prev: T) => T)) => void] {
  const [internal, setInternal] = useState<T>(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? (controlled as T) : internal;

  const set = useCallback(
    (updater: T | ((prev: T) => T)) => {
      const next =
        typeof updater === "function"
          ? (updater as (prev: T) => T)(value)
          : updater;
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange, value],
  );

  return [value, set];
}

let idCounter = 0;
export const createFileId = (): string =>
  `dzf_${Date.now().toString(36)}_${(idCounter++).toString(36)}`;
