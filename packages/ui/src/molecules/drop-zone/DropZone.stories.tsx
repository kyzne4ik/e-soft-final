import { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropZone } from "./DropZone";
import type { DropZoneFile } from "./DropZoneContext";

const meta = {
  title: "Molecules/DropZone",
  component: DropZone,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: { children: null },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 460 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DropZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropZone accept=".pdf,.docx,.png,.jpg" maxSize={10 * 1024 * 1024}>
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>Перетащите файлы сюда или нажмите</DropZone.Label>
        <DropZone.Description>
          PDF, DOCX, PNG или JPG до 10 МБ.
        </DropZone.Description>
        <DropZone.Trigger>Выбрать файлы</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input />
      <DropZone.FileList />
    </DropZone>
  ),
};

export const ComposedTemplate: Story = {
  render: () => (
    <DropZone
      defaultItems={[
        {
          id: "1",
          name: "Proposal.pdf",
          size: 2_456_000,
          status: "done",
          progress: 100,
        },
        {
          id: "2",
          name: "design.fig",
          size: 5_100_000,
          status: "uploading",
          progress: 48,
        },
      ]}
    >
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>Drag files here or click to browse</DropZone.Label>
        <DropZone.Description>
          PDF, DOCX, PNG, or JPG up to 10 MB.
        </DropZone.Description>
        <DropZone.Trigger>Select files</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input />
      <DropZone.FileList>
        <DropZone.FileItem>
          <DropZone.FileFormatIcon />
          <DropZone.FileInfo>
            <DropZone.FileName>Proposal.pdf</DropZone.FileName>
            <DropZone.FileMeta>2.4 MB</DropZone.FileMeta>
          </DropZone.FileInfo>
          <DropZone.FileProgress>
            <DropZone.FileProgressTrack>
              <DropZone.FileProgressFill />
            </DropZone.FileProgressTrack>
          </DropZone.FileProgress>
          <DropZone.FileRetryTrigger />
          <DropZone.FileRemoveTrigger />
        </DropZone.FileItem>
      </DropZone.FileList>
    </DropZone>
  ),
};

export const WithUpload: Story = {
  render: () => {
    const [items, setItems] = useState<DropZoneFile[]>([]);
    const timers = useRef<Record<string, ReturnType<typeof setInterval>>>({});

    const runUpload = (id: string, willFail = false) => {
      clearInterval(timers.current[id]);
      timers.current[id] = setInterval(() => {
        setItems((prev) =>
          prev.map((item) => {
            if (item.id !== id) return item;
            const next = Math.min(100, (item.progress ?? 0) + 14);
            if (next >= 100) {
              clearInterval(timers.current[id]);
              return willFail
                ? {
                    ...item,
                    status: "error",
                    error: "Сбой сети",
                    progress: undefined,
                  }
                : { ...item, status: "done", progress: 100 };
            }
            return { ...item, status: "uploading", progress: next };
          }),
        );
      }, 280);
    };

    const handleFilesAdded = (files: File[]) => {
      setItems((prev) => {
        const created: DropZoneFile[] = files.map((file, i) => ({
          id: `${Date.now()}_${i}`,
          name: file.name,
          size: file.size,
          status: "uploading",
          progress: 0,
          file,
        }));
        created.forEach((c, i) =>
          setTimeout(() => runUpload(c.id, i === created.length - 1), 0),
        );
        return [...prev, ...created];
      });
    };

    return (
      <DropZone
        items={items}
        onItemsChange={setItems}
        onFilesAdded={handleFilesAdded}
        onRetry={(id) => runUpload(id, false)}
        multiple
      >
        <DropZone.Area>
          <DropZone.Icon />
          <DropZone.Label>Перетащите файлы сюда или нажмите</DropZone.Label>
          <DropZone.Description>
            Любой формат, имитация загрузки.
          </DropZone.Description>
          <DropZone.Trigger>Выбрать файлы</DropZone.Trigger>
        </DropZone.Area>
        <DropZone.Input />
        <DropZone.FileList />
      </DropZone>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DropZone
      disabled
      defaultItems={[
        {
          id: "1",
          name: "archive.zip",
          size: 2_456_000,
          status: "done",
          progress: 100,
        },
      ]}
    >
      <DropZone.Area>
        <DropZone.Icon />
        <DropZone.Label>Загрузка недоступна</DropZone.Label>
        <DropZone.Description>Дедлайн домашки уже прошёл.</DropZone.Description>
        <DropZone.Trigger>Выбрать файлы</DropZone.Trigger>
      </DropZone.Area>
      <DropZone.Input />
      <DropZone.FileList />
    </DropZone>
  ),
};
