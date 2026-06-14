export type FileTone =
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "secondary"
  | "tertiary"
  | "neutral";

export interface FileKind {
  icon: string;
  tone: FileTone;
  label: string;
}

const ARCHIVE: FileKind = {
  icon: "file-archive",
  tone: "warning",
  label: "Архив",
};
const SPREADSHEET: FileKind = {
  icon: "file-spreadsheet",
  tone: "success",
  label: "Таблица",
};
const DOCUMENT: FileKind = {
  icon: "file-text",
  tone: "info",
  label: "Документ",
};
const PDF: FileKind = { icon: "file-text", tone: "error", label: "PDF" };
const CODE: FileKind = { icon: "file-code", tone: "primary", label: "Код" };
const JSON_KIND: FileKind = {
  icon: "file-json",
  tone: "primary",
  label: "JSON",
};
const IMAGE: FileKind = {
  icon: "image",
  tone: "tertiary",
  label: "Изображение",
};
const VIDEO: FileKind = {
  icon: "file-video",
  tone: "secondary",
  label: "Видео",
};
const AUDIO: FileKind = {
  icon: "file-audio",
  tone: "secondary",
  label: "Аудио",
};
const PRESENTATION: FileKind = {
  icon: "presentation",
  tone: "warning",
  label: "Презентация",
};

export const GENERIC_KIND: FileKind = {
  icon: "file",
  tone: "neutral",
  label: "Файл",
};

const EXTENSION_KIND: Record<string, FileKind> = {
  // архивы
  zip: ARCHIVE,
  rar: ARCHIVE,
  "7z": ARCHIVE,
  tar: ARCHIVE,
  gz: ARCHIVE,
  tgz: ARCHIVE,
  // таблицы
  xls: SPREADSHEET,
  xlsx: SPREADSHEET,
  csv: SPREADSHEET,
  ods: SPREADSHEET,
  // документы
  doc: DOCUMENT,
  docx: DOCUMENT,
  rtf: DOCUMENT,
  odt: DOCUMENT,
  txt: DOCUMENT,
  md: DOCUMENT,
  // pdf
  pdf: PDF,
  // код
  js: CODE,
  jsx: CODE,
  ts: CODE,
  tsx: CODE,
  html: CODE,
  css: CODE,
  scss: CODE,
  py: CODE,
  java: CODE,
  c: CODE,
  cpp: CODE,
  cs: CODE,
  go: CODE,
  rs: CODE,
  rb: CODE,
  php: CODE,
  sh: CODE,
  vue: CODE,
  svelte: CODE,
  sql: CODE,
  yml: CODE,
  yaml: CODE,
  json: JSON_KIND,
  // изображения
  png: IMAGE,
  jpg: IMAGE,
  jpeg: IMAGE,
  gif: IMAGE,
  svg: IMAGE,
  webp: IMAGE,
  bmp: IMAGE,
  // видео
  mp4: VIDEO,
  mov: VIDEO,
  avi: VIDEO,
  mkv: VIDEO,
  webm: VIDEO,
  // аудио
  mp3: AUDIO,
  wav: AUDIO,
  ogg: AUDIO,
  flac: AUDIO,
  // презентации
  ppt: PRESENTATION,
  pptx: PRESENTATION,
  key: PRESENTATION,
};

export const getExtension = (name: string): string => {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
};

export const getFileKind = (name: string): FileKind =>
  EXTENSION_KIND[getExtension(name)] ?? GENERIC_KIND;

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB", "TB"];
  let value = bytes / 1024;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[i]}`;
};
