import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileCard } from "./FileCard";

const meta = {
  title: "Molecules/FileCard",
  component: FileCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 380 }}>
        <Story />
      </div>
    ),
  ],
  args: { name: "homework.zip", size: 2_456_000 },
} satisfies Meta<typeof FileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Removable: Story = {
  args: { onRemove: () => {} },
};

export const Uploading: Story = {
  args: { name: "dataset.csv", status: "uploading", progress: 64 },
};

export const Done: Story = {
  args: {
    name: "report.xlsx",
    size: 184_320,
    status: "done",
    onRemove: () => {},
  },
};

export const Errored: Story = {
  args: {
    name: "huge-video.mp4",
    status: "error",
    errorText: "Файл больше 50 МБ",
    onRemove: () => {},
  },
};

export const Types: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {[
        ["archive.zip", 2_456_000],
        ["budget.xlsx", 184_320],
        ["notes.txt", 4_096],
        ["report.pdf", 980_000],
        ["Button.jsx", 3_200],
        ["config.json", 1_024],
        ["screenshot.png", 540_000],
        ["intro.mp4", 18_400_000],
        ["track.mp3", 5_200_000],
        ["deck.pptx", 7_300_000],
        ["unknown.bin", 12_000],
      ].map(([name, size]) => (
        <FileCard
          key={name as string}
          name={name as string}
          size={size as number}
          onRemove={() => {}}
        />
      ))}
    </div>
  ),
};

interface UploadItem {
  id: number;
  name: string;
  size: number;
  progress: number;
  status: "uploading" | "done";
}

export const UploadDemo: Story = {
  render: () => {
    const [items, setItems] = useState<UploadItem[]>([]);
    const idRef = useRef(0);

    const addFiles = (files: FileList | null) => {
      if (!files) return;
      Array.from(files).forEach((file) => {
        const id = idRef.current++;
        setItems((prev) => [
          ...prev,
          {
            id,
            name: file.name,
            size: file.size,
            progress: 0,
            status: "uploading",
          },
        ]);

        const timer = setInterval(() => {
          setItems((prev) =>
            prev.map((item) => {
              if (item.id !== id) return item;
              const next = Math.min(100, item.progress + 12);
              return {
                ...item,
                progress: next,
                status: next >= 100 ? "done" : "uploading",
              };
            }),
          );
        }, 250);

        setTimeout(() => clearInterval(timer), 250 * 10);
      });
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label
          style={{
            display: "inline-flex",
            gap: 8,
            padding: "10px 16px",
            border: "1px dashed var(--surface-border)",
            borderRadius: "var(--radius-md)",
            cursor: "pointer",
            color: "var(--text-secondary)",
            justifyContent: "center",
          }}
        >
          + Выбрать файлы
          <input
            type="file"
            multiple
            hidden
            onChange={(e) => addFiles(e.target.files)}
          />
        </label>

        {items.map((item) => (
          <FileCard
            key={item.id}
            name={item.name}
            size={item.size}
            progress={item.progress}
            status={item.status}
            onRemove={() =>
              setItems((prev) => prev.filter((i) => i.id !== item.id))
            }
          />
        ))}
      </div>
    );
  },
};
