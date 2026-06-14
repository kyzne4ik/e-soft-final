import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

const meta = {
  title: "Atoms/Text",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Text.Title>Title — заголовок страницы</Text.Title>
      <Text.H1>H1 — крупный заголовок</Text.H1>
      <Text.H2>H2 — заголовок секции</Text.H2>
      <Text.P1>
        P1 — основной текст абзаца. Используется для большинства контента в
        интерфейсе.
      </Text.P1>
      <Text.P1Bold>P1 Bold — выделенный основной текст</Text.P1Bold>
      <Text.P2>P2 — вторичный текст, подписи и пояснения.</Text.P2>
      <Text.P1Link>P1 Link — ссылка обычного размера</Text.P1Link>
      <Text.P2Link>P2 Link — ссылка мелкого размера</Text.P2Link>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Text.P1 align="left">{'align="left"'}</Text.P1>
      <Text.P1 align="center">{'align="center"'}</Text.P1>
      <Text.P1 align="right">{'align="right"'}</Text.P1>
      <Text.P1 align="justify">
        {'align="justify"'} — текст растягивается по ширине строки, чтобы оба
        края были ровными. Подходит для длинных абзацев.
      </Text.P1>
    </div>
  ),
};

export const Modifiers: Story = {
  render: () => (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 12, width: 240 }}
    >
      <Text.P2>noWrap — текст в одну строку с обрезкой переполнения:</Text.P2>
      <div
        style={{
          overflow: "hidden",
          border: "1px dashed var(--surface-border)",
        }}
      >
        <Text.P1
          noWrap
          style={{ textOverflow: "ellipsis", overflow: "hidden" }}
        >
          Очень длинная строка, которая не переносится на новую строку
        </Text.P1>
      </div>
      <Text.P2>onFullWidth — занимает всю ширину контейнера:</Text.P2>
      <Text.P1
        onFullWidth
        align="center"
        style={{ background: "var(--surface-muted)" }}
      >
        on full width
      </Text.P1>
    </div>
  ),
};
